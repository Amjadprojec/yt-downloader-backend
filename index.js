const express = require('express');
const YTDlpWrap = require('yt-dlp-wrap').default;

const app = express();
app.use(express.json({ limit: '10mb' }));

const ytDlp = new YTDlpWrap();

app.post('/download', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Link YouTube wajib diisi' });
  }

  try {
    // Ambil info video & pilih format terbaik (HD video + audio)
    const info = await ytDlp.getVideoInfo(url);
    const formats = info.formats
      .filter(f => f.vcodec !== 'none' && f.acodec !== 'none')
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    const bestFormat = formats[0];

    if (!bestFormat || !bestFormat.url) {
      throw new Error('Gak nemu link HD');
    }

    res.json({
      success: true,
      title: info.title,
      downloadUrl: bestFormat.url,
      thumbnail: info.thumbnail
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Gagal proses link YouTube' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend jalan di port ${PORT}`);
});
