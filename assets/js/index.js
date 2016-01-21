(function() {

	//阻止默认行为
	$(document).on('touchmove', function(ev) {
		ev.preventDefault();
	});

	$(function() {

		var $oContainer = $('.container-wrapper');
		var $aSection = $oContainer.find('.section');
		var viewHeight = $(window).height();
		$oContainer.height(viewHeight);

		showLoading();
		fnSlideSection();
		fnBuy();

		// 滑屏操作
		function fnSlideSection() {

			var startY = 0,
				step = 1 / 4,
				currIndex = 0,
				nextOrPrevIndex = 0,
				btnOff = true;

			$aSection.on('touchstart', function(ev) {

				if (btnOff) {

					btnOff = false;
					var touch = ev.originalEvent.changedTouches[0];
					startY = touch.pageY;
					currIndex = $(this).index();

					$aSection.on('touchmove.move', function(ev) {

						var touch = ev.originalEvent.changedTouches[0];
						$(this).siblings().hide();
						if (touch.pageY < startY) { //向上滑动
							nextOrPreIndex = currIndex == $aSection.length - 1 ? 0 : currIndex + 1;
							$aSection.eq(nextOrPreIndex).css('transform', 'translateY(' + (viewHeight + touch.pageY - startY) + 'px)');
						} else { //向下滑动							
							nextOrPreIndex = currIndex == 0 ? $aSection.length - 1 : currIndex - 1;
							$aSection.eq(nextOrPreIndex).css('transform', 'translateY(' + (-viewHeight + touch.pageY - startY) + 'px)');
						}
						$aSection.eq(nextOrPreIndex).show().addClass('zIndex');
						$(this).css('transform', 'translateY(' + (touch.pageY - startY) * step + 'px) scale(' + (1 - Math.abs((touch.pageY - startY)) * step / viewHeight) + ')');

						$aSection.on('touchend.move', function(ev) {
							var touch = ev.originalEvent.changedTouches[0];
							if (touch.pageY < startY) { //向上滑动
								$aSection.eq(currIndex).css('transform', 'translateY(' + (-viewHeight * step) + 'px) scale(' + (1 - step) + ')');
							} else { //向下滑动
								$aSection.eq(currIndex).css('transform', 'translateY(' + (viewHeight * step) + 'px) scale(' + (1 - step) + ')');
							}
							$aSection.eq(currIndex).css('transition', '0.3s');
							$aSection.eq(nextOrPreIndex).css('transform', 'translateY(0)');
							$aSection.eq(nextOrPreIndex).css('transition', '0.3s');
							$aSection.off('.move');
						});

					});
				}

			});

			//动画完成后触发
			$aSection.on('transitionEnd webkitTransitionEnd', function(ev) {
				if (!$aSection.is(ev.target)) {
					return;
				}
				resetFn();
				if (arrAnimate[currIndex]) {
					arrAnimate[currIndex].outAn();
				}
				if (arrAnimate[nextOrPreIndex]) {
					arrAnimate[nextOrPreIndex].inAn();
				}
			});

			function resetFn() {
				$aSection.css('transform', '').css('transition', '').eq(nextOrPreIndex).removeClass('zIndex').siblings().hide();
				btnOff = true;
			}

		}
		
		// 出入场动画
		var arrAnimate = [{
			inAn: function() {
				setTimeout(function() {
					var $oImg = $aSection.eq(0).find('.logo').find('img');
					$oImg.css('transition', '1s');
					$oImg.css('transform', 'rotateY(720deg)');
				}, 100);
			},
			outAn: function() {
				var $oImg = $aSection.eq(0).find('.logo').find('img');
				$oImg.css('transition', '');
				$oImg.css('transform', '');
			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oContent = $aSection.eq(1).find('.content');
					$oContent.css('transition', '1s');
					$oContent.css('top', '0');
				}, 100);
			},
			outAn: function() {
				var $oContent = $aSection.eq(1).find('.content');
				$oContent.css('transition', '');
				$oContent.css('top', '-200%');
			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oTitle = $aSection.eq(2).find('.title');
					$oTitle.css('transition', '1s');
					$oTitle.css('top', '5%');
				}, 100);
			},
			outAn: function() {
				var $oTitle = $aSection.eq(2).find('.title');
				$oTitle.css('transition', '');
				$oTitle.css('top', '-200%');
			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oTitle = $aSection.eq(3).find('.title');
					$oTitle.css('transition', '1s');
					$oTitle.css('top', '5%');
				}, 100);
				setTimeout(function() {
					var $oContent = $aSection.eq(3).find('.content');
					$oContent.css('transition', '1s');
					$oContent.css('top', '16%');
				}, 1100);
				setTimeout(function() {
					var $oCircle = $aSection.eq(3).find('.circle');
					$oCircle.css('transition', '1s');
					$oCircle.css({
						'opacity':'1',
						'transform': 'scale(1) rotateZ(720deg)'
					});
				}, 2100);
			},
			outAn: function() {
				var $oTitle = $aSection.eq(3).find('.title');
				$oTitle.css('transition', '');
				$oTitle.css('top', '-200%');
				var $oContent = $aSection.eq(3).find('.content');
				$oContent.css('transition', '1s');
				$oContent.css('top', '200%');
				var $oCircle = $aSection.eq(3).find('.circle');
				$oCircle.css('transition', '');
				$oCircle.css({
					'opacity':'0',
					'transform': ''
				});
			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oTitle = $aSection.eq(4).find('.title');
					$oTitle.css('transition', '1s');
					$oTitle.css('top', '32%');
				}, 100);
				setTimeout(function() {
					var $oInfo = $aSection.eq(4).find('.info');
					$oInfo.css('transition', '1s');
					$oInfo.css('bottom', '0');
				}, 1100);
				setTimeout(function() {
					var $oCircle = $aSection.eq(4).find('.circle');
					$oCircle.css('transition', '1s');
					$oCircle.css({
						'opacity':'1',
						'transform': 'scale(1) rotateZ(720deg)'
					});
				}, 2100);
			},
			outAn: function() {
				var $oTitle = $aSection.eq(4).find('.title');
				$oTitle.css('transition', '');
				$oTitle.css('top', '-200%');
				var $oInfo = $aSection.eq(4).find('.info');
				$oInfo.css('transition', '1s');
				$oInfo.css('bottom', '-200%');
				var $oCircle = $aSection.eq(4).find('.circle');
				$oCircle.css('transition', '');
				$oCircle.css({
					'opacity':'0',
					'transform': ''
				});
			}
		}, {
			inAn: function() {

			},
			outAn: function() {

			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oTitle = $aSection.eq(6).find('.title');
					$oTitle.css('transition', '1s');
					$oTitle.css('top', '5%');
				}, 100);
				setTimeout(function() {
					var $oContent = $aSection.eq(6).find('.content');
					$oContent.css('transition', '1s');
					$oContent.css('top', '20%');
				}, 1100);
				setTimeout(function() {
					var $oBtn = $aSection.eq(6).find('.button');
					$oBtn.css('transition', '1s');
					$oBtn.css({
						'opacity':'1',
						'transform': 'scale(1) rotateZ(720deg)'
					});
				}, 2100);
			},
			outAn: function() {
				var $oTitle = $aSection.eq(6).find('.title');
				$oTitle.css('transition', '');
				$oTitle.css('top', '-200%');
				var $oContent = $aSection.eq(6).find('.content');
				$oContent.css('transition', '1s');
				$oContent.css('top', '200%');
				var $oBtn = $aSection.eq(6).find('.button');
				$oBtn.css('transition', '');
				$oBtn.css({
					'opacity':'0',
					'transform': ''
				});
			}
		}, {
			inAn: function() {
				setTimeout(function() {
					var $oTitle = $aSection.eq(7).find('.title');
					$oTitle.css('transition', '1s');
					$oTitle.css('bottom', '40%');
				}, 100);
			},
			outAn: function() {
				var $oTitle = $aSection.eq(7).find('.title');
				$oTitle.css('transition', '');
				$oTitle.css('bottom', '-200%');
			}
		}];

		$.each(arrAnimate, function(index, obj) {
			obj.outAn();
		});
		
		// loading效果
		function showLoading() {
			var arrImg = ['section_01_logo.png', 'arrow_up.png', 'section_02_bg.jpg', 'section_02_content.png', 'section_03_bg.jpg', 'section_03_title.png', 'section_04_bg.jpg', 'section_04_circle.png', 'section_04_content.png', 'section_04_title.png', 'section_05_bg.jpg', 'section_05_circle.png', 'section_05_info.png', 'section_05_title.png', 'section_06_bg.png', 'section_07_bg.jpg', 'section_07_button.png', 'section_07_content.png', 'section_07_title.png', 'section_08_bg.png', 'section_08_logo.png', 'qrcode.png', 'section_08_title.png'];
			var num = 0;
			$.each(arrImg, function(index, obj) {
				var objImg = new Image();
				objImg.src = 'assets/imgs/' + obj;
				objImg.onload = function() {
					num++;
					if (num == arrImg.length) {
						$('#loading').animate({
							opacity: 0
						}, 1000, function() {
							$(this).remove();
							// 首屏入场动画
							arrAnimate[0].inAn();
						});
					}
				};
				//图片加载错误或不全
				objImg.onerror = function() {
					$('#loading').animate({
						opacity: 0
					}, 1000, function() {
						$(this).remove();
						// 首屏入场动画
						arrAnimate[0].inAn();
					});
				};
			});
		}
		
		function fnBuy(){
			var $oBtn = $aSection.eq(6).find('.button');
			var $qrCode = $('#code-share');
			var $oBtnClose = $qrCode.find('.code-close');
			$oBtn.on('click',function(){
				$qrCode.show();
			});
			$oBtnClose.on('click',function(){
				$qrCode.hide();
			});
		}
		
	});

})();