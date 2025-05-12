/**
*	Hendrie (HTML)
*	Copyright 穢 Hendrie by beshleyua. All Rights Reserved.
**/

$(function () {


	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height':height});
	
	/* Preloader */
	$(window).on('load', function() {
		$(".preloader .spinner").fadeOut(function(){
			$('.preloader').fadeOut();
			$('body').addClass('ready');
		});

		console.log($('.typed-title'))
		/* Typed subtitle */
	try{
		$('.typed-title').typed({
			stringsElement: $('.typing-title'),
			backDelay: 5000,
			typeSpeed: 0,
			loop: true
		});
	}catch(e){
		console.log("e")
	}
	});

	/* Fade animations on scroll */
	if (width > 720) {
		window.sr = ScrollReveal();
		sr.reveal('.animated');
	}



/* Menu filled */
if($(window).scrollTop() > 10) {
	$('header').addClass('filled');
} else {
	$('header').removeClass('filled');
}
$(window).on('scroll', function() {
	if($(window).scrollTop() > 10) {
		$('header').addClass('filled');
	} else {
		$('header').removeClass('filled');
	}
});

/* Initialize masonry items */
var $container = $('.box-items');

$container.imagesLoaded(function() {
	$container.multipleFilterMasonry({
		itemSelector: '.box-item',
		filtersGroupSelector: '.filters',
		percentPosition: true,
		gutter: 0
	});
});



	/* Youtube video background */
	//var myPlayer = $("#video-bg").YTPlayer();

	/* Smoothscroll */
	if($('.section.started').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				var currLink = $(this);
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top <= scrollPos) {
					$('.top-menu ul li').removeClass("active");
					currLink.closest('li').addClass("active");
				}
			});
		});
	}

	/* Top Menu */
	if($('.section.started').length) {
		$('.top-menu ul li a').on('click', function(){
			var id = $(this).attr('href');
			var h = parseFloat($(id).offset().top);
			
			$('body,html').animate({
				scrollTop: h + 10
			}, 800);
			
			return false;
		});
	}

	/* Open Top Menu */
	$('.page').on('click', '.menu-btn', function(){
		if($('.top-menu').hasClass('active')){
			$('.top-menu').removeClass('active');
			$(this).removeClass('active');
		} else {
			$('.top-menu').addClass('active');
			$(this).addClass('active');
		}

		return false;
	});
	
	/* Hide mouse button on scroll */
	$(window).on('scroll', function() {
		if ($(this).scrollTop() >= height-10) {
			$('.mouse-btn').fadeOut();
		}
		if ($(this).scrollTop() <= height-10) {
			$('.mouse-btn').fadeIn();
		}
		if ($(this).scrollTop() <= height-10) {
			$('.top-menu ul li').removeClass("active");
		}
	});

	/* Pause/Play video on scroll */
	if ($('#video-bg').length) {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() >= height-10) {
				$('#video-bg').YTPPause();
			}
			if ($(this).scrollTop() <= height-10) {
				$('#video-bg').YTPPlay();
			}
		});
	}
	
	/* On click mouse button, page scroll down */
	$('.section').on('click', '.mouse-btn', function() {
		$('body,html').animate({
			scrollTop: height
		}, 800);
	});

	

	/* 12. Initialize masonry filter */
	$('.filters label').on('change', 'input[type="radio"]', function() {
		if ($(this).is(':checked')) {
			$('.f_btn').removeClass('active');
			$(this).closest('.f_btn').addClass('active');
		}
		/* Refresh Portfolio magnific popup */
		$('.has-popup').magnificPopup({
			type: 'inline',
			overflowY: 'auto',
			closeBtnInside: true,
			mainClass: 'mfp-fade'
		});
	});

	/* Portfolio magnific popup */
	$('.has-popup').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});
	
	/* gallery */
	$('.post-lightbox').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});
	
	/* Validate contact form */
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			tel: {
				required: true
			},
			message: {
				required: true
			},
			subject: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$.ajax({
				url: 'emailform.php',
				type: 'post',
				dataType: 'text',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&tel='+ $("#cform").find('input[name="tel"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&subject='+ $("#cform").find('input[name="subject"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {
				
				},
				complete: function() {
				
				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});
	/* Thr */
	
	const thr=function (fn,delay){
		return function(){
			if(!checkInput())	return false;
			if( + new Date() - (fn['starttime']||0)>=delay){
				fn.apply(this,arguments);
				fn['starttime']=+new Date();
			}else{
				alert('Too Busy');
				return false;
			}
		}
	} 
	
	var initSubject='',initBody='';
	 
	function checkInput(){
		
			const name = $("input[name='name']").val();
			const email =  $("input[name='email']").val();
			const tel =  $("input[name='tel']").val();
			const subject =  $("input[name='subject']").val();
			const content=$("textarea[name='message']").val();
			if(!(name&&email&&tel&&subject&&content)){
				alert("You need fill all field!");
				return false;
			}else{
				return true;
			}
	}

	//��劐�见�喲����厰�訫��嘑銵�
	const submit=function submit(){
		const  to = "marcoleemar@gmail.com";
		const name = $("input[name='name']").val();
		const email =  $("input[name='email']").val();
		const tel =  $("input[name='tel']").val();
		const subject =  $("input[name='subject']").val();
		const content=$("textarea[name='message']").val();
//���user憛怎�鞈��䠷�賢�𧼮� mail body 銝�
		var body = ""+content+'%0A%0A%0A';
			body += "From:"+name+'%0A';
			body += "Email:"+email+'%0A';
			body += "Tel:"+tel;
//�喲����銝餉�蝔见�讐Ⅳ
		mailTo.href="mailto:"+to+"?subject="+subject+"&body="+body;
		mailTo.click();
	}
//�銁body onload
	

	const submitBtn=document.querySelector('#submit-btn');
	submitBtn.addEventListener('click',thr(function(){
		//$('#cform').submit();
		submit();
		return false;
	},10000)
	)

	/* Validate contact form */
	$("#blog-form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$('#blog-form').fadeOut();
			$('.alert-success').delay(1000).fadeIn();
		}
	});

});

