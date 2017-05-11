Polymer({
	is: name,
	properties: {
		/** The url to the youtube video. */
		url: String,
		/** Url to the poster, before video is played. */
		coverImg: String,
		/** Aspect Ratio of the video */
		aspectRatio: {
			type: String,
			value: "16:9"
		},
        variation: {
            type: String,
            value: 1
        }
	},

	/** Runs the youtube-scripts once attached */
	attached: function() {

		var videoId = new Date().getUTCMilliseconds()+Math.random().toString(16).slice(2);
		$(this.$.richmedia).attr("id", videoId);
		
		if(this.url) {
			this._mediaInit(this.$$('.video-js'));
		}
		
	},

	getPoster: function() {
		if(!this.coverImg)
			return "https://static.scania.com/resources/images/demo/image_01.jpg";
		else
			return this.coverImg;
	},

	/** runs youtube-scripts  */
	_mediaInit: function(selector) {
		if(this._init == true)
			return;
		this._init = true;
		var videoEl     = selector,
        youtubeUrl  	= this.url,
        posterImage 	= this.coverImg,
       	dataSetup 		= '{ "fluid": true, "poster": "' + posterImage + '", "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "' + youtubeUrl + '"}]}',
       	á;



        if(youtubeUrl !== '') {
        	$(videoEl).attr('data-setup', dataSetup);
    	}

    	this.youtubeInit(videoEl,  { "aspectRatio": "16:9", "poster": posterImage });

	},

	youtubeInit: function(e, t) {


		if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || navigator.userAgent.toLowerCase().indexOf("ipad") > -1) {

    		this.lfunction(e, t); 
		}

		else if (t) {

		    var a = videojs(e, t);
		    a.ready(function() {
		        $(this.el()).find("[tabindex]").attr("tabindex", "-1")
		    });

		    a.on("play", function() {
		        $(a.el()).parent().focus()
		    });

		    $(a.el()).parent().attr("tabindex", 0);
		    $(a.el()).parent().on("keypress", function(e) {
		        if (32 == e.charCode) {
		            e.preventDefault();
		            if (a.paused())
		                a.play();
		            else
		                a.pause()
		        }
		    });

		    $(a.el()).parent().on("keydown", function(e) {
		        var t = 0
		          , r = 0;
		        switch (e.keyCode) {
		        case 37:
		            e.preventDefault();
		            t = a.currentTime() - 5;
		            if (t < 0)
		                t = 0;
		            a.currentTime(t);
		            break;
		        case 38:
		            e.preventDefault();
		            r = a.volume() + .1;
		            if (r > 1)
		                r = 1;
		            a.volume(r);
		            break;
		        case 39:
		            e.preventDefault();
		            t = a.currentTime() + 5;
		            if (t > a.duration())
		                t = a.duration();
		            a.currentTime(t);
		            break;
		        case 40:
		            e.preventDefault();
		            r = a.volume() - .1;
		            if (r < 0)
		                r = 0;
		            a.volume(r)
		        }
		    });

		    
		} else
		    videojs(e)

		},


		lfunction: function(e, i) {

			    var t = {},
					    a = {},
					r = false;

			var n = $(e)
			  , l = n.attr("id")
			  , o = '<div data-setup="[[data-setup]]" id="[[id]]" class="[[class]]">\r\n    <div style="width:100%;height:100%;position:relative">\r\n        <div id="[[id]]_Youtube_api" 			style="width:100%;height:100%;top:0;left:0;position:absolute"></div>\r\n    </div>\r\n</div>';
			if (l && a[l])
			    return a[l];
			var u = i.aspectRatio
			  , s = i.poster
			  , d = JSON.parse(n.attr("data-setup"));
			var c = {};
			c.originalElement = n;
			c.playerParent = n.parent();
			var p = u.split(":");
			console.log(u);
			c.aspectRatio = parseInt(p[0]) / parseInt(p[1]);
			c.posterImage = s;
			c.videoUrl = d.sources[0].src;
			var f = c.videoUrl.split("?"), v;
			f = f[f.length - 1].split("&");
			f.forEach(function(e) {
			    if (e.indexOf("v=") > -1)
			        v = e.replace("v=", "")
			});
			c.videoId = v;
			if (!l || "" == l) {
			    var y = $('div[id^="youtube_fallback"], video[id^="youtube_fallback"]').length
			      , l = "youtube_fallback_" + y;
			    c.originalElement.attr("id", l)
			}
			c.elementId = l;
			c.playerId = l + "_Youtube_api";
			o = o.replace(/\[\[id\]\]/g, l).replace("[[data-setup]]", c.originalElement.attr("data-setup")).replace("[[class]]", c.originalElement.attr("class")).replace("[[poster]]", c.posterImage);
			c.playerParent.empty().html(o);
			c.currentContainer = $("#" + l);
			$.each(c.originalElement[0].attributes, function() {
			    c.currentContainer.attr(this.name, this.value)
			});
			c.currentContainer.addClass("youtubeFallback");
			c.videoPaused = true;
			c.initPlayer = function() {
			    var e = this.originalElement.width()
			      , t = e / this.aspectRatio;
			    if ("undefined" != typeof YT)
			        this.YTPlayer = new YT.Player(this.playerId,{
			            height: e,
			            width: t,
			            videoId: this.videoId,
			            playerVars: {
			                rel: 0,
			                showinfo: 0
			            },
			            events: {
			                onReady: this.onPlayerReady,
			                onStateChange: this.onPlayerStateChange
			            }
			        })
			}
			;
			c.onPlayerReady = function() {
			    c.currentElement = c.YTPlayer.getIframe();
			    c.currentContainer.addClass("fallbackInitialized");
			    c.currentContainer.click(function() {
			        c.currentContainer.addClass("fallbackPlaying");
			        c.play()
			    })
			}
			;
			c.onPlayerStateChange = function(e) {
			    switch (e.data) {
			    case YT.PlayerState.PLAYING:
			        c.videoPaused = false;
			        c.playCallback.forEach(function(e) {
			            var t = {};
			            t.target = c.currentElement;
			            t.currentTarget = c.currentElement;
			            t.type = "Youtube Video Play";
			            e(t)
			        });
			        break;
			    case YT.PlayerState.PAUSED:
			        c.videoPaused = true
			    }
			}
			;
			c.playCallback = [];
			c.play = function() {
			    if (this.YTPlayer)
			        this.YTPlayer.playVideo()
			}
			;
			c.pause = function() {
			    if (this.YTPlayer)
			        this.YTPlayer.pauseVideo()
			}
			;
			c.paused = function() {
			    return c.videoPaused
			}
			;
			c.on = function(e, t) {
			    switch (e) {
			    case "play":
			        this.playCallback.push(t);
			        break;
			    default:
			        throw new Error(e + " is not an event")
			    }
			}
			;
			if (r || ("undefined" != typeof YT && "undefined" != typeof YT.Player))
			    c.initPlayer();
			else
			    t[c.elementId] = c;
			a[c.elementId] = c;
			window.onYouTubeIframeAPIReady = function() {
			    r = true;
			    for (var e in t)
			        t[e].initPlayer()
			}
			;
			
		}
})