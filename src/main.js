const TikTokScraper = require('tiktok-scraper')

class TikTok {
	constructor(options){
      this.options = options
	}

	async getUserProfileInfo(username){
		username = username.toLowerCase()
     let info = await TikTokScraper.getUserProfileInfo(username , this.options)
	  return info
	}

	async getVideoMeta(videoURL){
     let info = await TikTokScraper.getVideoMeta(videoURL , this.options)
	 info = await info.collector[0]
	  return {
        name: info.text ? info.text : 'tiktok movie',
        createAt: info.createTime,
        video: info.videoUrl,
        music: info.musicMeta,
        image: info.imageUrl 
	  }
	}

	async getMusicMeta(videoURL){
		let {music} = await this.getVideoMeta(videoURL, this.options)
		let res = await TikTokScraper.music(music.musicId, this.options)
		res = await res.collector[0]
		return {
           res
		}
	}

}


let tiktok = new TikTok()
;(async _=>{
	// let res = await tiktok.getUserProfileInfo('offism')
	// let res = await tiktok.getVideoMeta('https://www.tiktok.com/@offism7/video/6947913050674482434?lang=ru-RU&is_copy_url=1&is_from_webapp=v1')
	let res = await tiktok.getMusicMeta('https://www.tiktok.com/@offism7/video/6947913050674482434?lang=ru-RU&is_copy_url=1&is_from_webapp=v1')
	console.log(res)
})()