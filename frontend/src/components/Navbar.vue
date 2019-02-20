<!-- ... end Responsive Header-BP -->
<template>
<div>
<header class="header" id="site-header">

	<div class="logo-top">
		<router-link to="/"><img src="../assets/img/bakimbi-logo.png"></router-link> 
	</div>

	<div class="header-content-wrapper">
		<form style="margin-left: 23%;" class="search-bar w-search notification-list friend-requests">
			<div class="dropdown"> 
			<div class="form-group with-button">
				<input class="form-control" data-toggle="dropdown" v-model="searchData" v-on:keypress.enter.prevent="test" type="text">
				<button>
					<svg class="olymp-magnifying-glass-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
				</button>
				<div  style="width: 100%; padding: 1.5rem 0;" class="dropdown-menu" aria-labelledby="dropdownMenu2">
					
    <button style="left: 0 !important; background-color: white; position: relative;" class="dropdown-item" type="button">data 1</button>
	<button style="left: 0 !important; background-color: white; position: relative;" class="dropdown-item" type="button">data 2</button>
	<button style="left: 0 !important; background-color: white; position: relative;" class="dropdown-item" type="button">data 3</button>
    
  </div>
			</div>
			</div>
		</form>

		<div style="margin-right: 3%" class="control-block">

			<div class="control-icon more has-items">
				<i style="color: white;" class="material-icons">question_answer</i>
				<div class="label-avatar bg-purple">4</div>

				<div class="more-dropdown more-with-triangle triangle-top-center">
					<div class="ui-block-title ui-block-title-small">
						<h6 class="title">Mesajlar</h6>
						<a href="#">Tümünü okundu olarak işaretle.</a>
						<a href="#">Ayarlar</a>
					</div>

					<div class="mCustomScrollbar" data-mcs-theme="dark">
						<ul class="notification-list chat-message">
							<li class="message-unread">
								<div class="author-thumb">
									<img src="../assets/img/avatar59-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<a href="#" class="h6 notification-friend">Sözlük Süvarisi</a>
									<span class="chat-message-item">Merhabalar Poyraz, dün girdiğin entry ile ilgili konuşabilir miyiz?</span>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 saat önce</time></span>
								</div>
								<span class="notification-icon">
									<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
								</span>
								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
								</div>
							</li>

							<li>
								<div class="author-thumb">
									<img src="../assets/img/avatar60-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<a href="#" class="h6 notification-friend">Gri Davulcu</a>
									<span class="chat-message-item">Kardeşim çok üzüldüm, yapabileceğimiz bir şey var mı?</span>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 saat önce</time></span>
								</div>
								<span class="notification-icon">
									<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
								</span>

								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
								</div>
							</li>
							<li>
								<div class="author-thumb">
									<img src="../assets/img/avatar61-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<a href="#" class="h6 notification-friend">Uzay Mekiği</a>
									<span class="chat-message-item">Selam, nasıl yazar oldun? Ne kadar sürede onaylanıyor?</span>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Dün 21:45</time></span>
								</div>
									<span class="notification-icon">
										<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
									</span>
								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
								</div>
							</li>

							<li class="chat-group">
								<div class="author-thumb">
									<img src="../assets/img/avatar11-sm.jpg" alt="author">
									<img src="../assets/img/avatar12-sm.jpg" alt="author">
									<img src="../assets/img/avatar13-sm.jpg" alt="author">
									<img src="../assets/img/avatar10-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<a href="#" class="h6 notification-friend">Bizimkiler</a>
									<span class="last-message-author">Ed:</span>
									<span class="chat-message-item">Hadi kesin sesinizi yarın görüşürüz</span>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">16 Mart 10:23</time></span>
								</div>
									<span class="notification-icon">
										<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
									</span>
								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
								</div>
							</li>
						</ul>
					</div>

					<a href="#" class="view-all bg-purple">Tüm Mesajlara Bakimbi...</a>
				</div>
			</div>

			<div class="control-icon more has-items">
				<i style="color: white;" class="material-icons">flash_on</i>

				<div class="label-avatar bg-primary">8</div>

				<div class="more-dropdown more-with-triangle triangle-top-center">
					<div class="ui-block-title ui-block-title-small">
						<h6 class="title">Bildirimler</h6>
						<a href="#">Görüldü olarak işaretle</a>
						<a href="#">Ayarlar</a>
					</div>

					<div class="mCustomScrollbar" data-mcs-theme="dark">
						<ul class="notification-list">
							<li>
								<div class="author-thumb">
									<img src="../assets/img/avatar62-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<div><a href="#" class="h6 notification-friend">Aşk Kadını</a> seni takip etti</div>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 saat önce</time></span>
								</div>
									<span class="notification-icon">
										<svg class="olymp-comments-post-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
									</span>

								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
								</div>
							</li>

							<li class="un-read">
								<div class="author-thumb">
									<img src="../assets/img/avatar63-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<div><a href="#" class="h6 notification-friend">Atını Seven Kovboy</a> <a href="#" class="notification-link">şu entry'ni</a> beğendi.</div>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">9 saat önce</time></span>
								</div>
									<span class="notification-icon">
										<svg class="olymp-happy-face-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
									</span>

								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
								</div>
							</li>

							<li class="with-comment-photo">
								<div class="author-thumb">
									<img src="../assets/img/avatar64-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<div><a href="#" class="h6 notification-friend">Uyku Vakti</a> <a href="#" class="notification-link">şu entry'ne</a> yorum yaptı</div>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Dün 5:32</time></span>
								</div>
									<span class="notification-icon">
										<svg class="olymp-comments-post-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
									</span>

								

								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
								</div>
							</li>
							<li class="with-comment-photo">
								<div class="author-thumb">
									<img src="../assets/img/avatar7-sm.jpg" alt="author">
								</div>
								<div class="notification-event">
									<div><a href="#" class="h6 notification-friend">Mecnunun Leylası</a> seni takip etti</div>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Dün 5:32</time></span>
								</div>
									<span class="notification-icon">
										<svg class="olymp-comments-post-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
									</span>

								

								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
								</div>
							</li>

							<li>
								<div class="notification-event">
									<div><a href="#" class="h6 notification-friend">Haftanın ENtrylerini güncelledik</a></div>
									<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">5 Mart</time></span>
								</div>
									

								<div class="more">
									<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
									<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
								</div>
							</li>
						</ul>
					</div>

					<a href="bildirimler.php" class="view-all bg-primary">Tüm Bildirimlere Bakimbi...</a>
				</div>
			</div>

			<div class="author-page author vcard inline-items more">
				<div class="author-thumb">
					<img alt="author" :src="'../assets/profile_pics/' + this.$cookies.get('user').profile_pics" style="height:36px; width:36px;" class="avatar">
					
					<div class="more-dropdown more-with-triangle">
						<div class="mCustomScrollbar" data-mcs-theme="dark">
							<div class="ui-block-title ui-block-title-small">
								<h6 class="title">Hesabın</h6>
							</div>

							<ul class="account-settings">
								<li>
									<router-link to="/ProfileSettings">

										<svg class="olymp-menu-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>

										<span>Profil Ayarları</span>
									</router-link>
								</li>
								<li>
									<a href="#">
										<svg class="olymp-logout-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-logout-icon"></use></svg>

										<span>Çıkış</span>
									</a>
								</li>
							</ul>
						</div>

					</div>
				</div>
			</div>

		</div>
	</div>
<ul style="height: 35px; background-color: #d32f2f; margin-right: -70px;  text-align: left;" class="list-inline listem-altband-ul">
		<li class="list-inline-item listem-altband"><a style="color: white;" href="">Neler Oluyor ?</a> </li>
		<li class="list-inline-item listem-altband"><a style="color: white;" href="">Bugün</a></li>
		<li class="list-inline-item listem-altband"><a style="color: white;" href="">Tayfa</a></li>
		<li class="list-inline-item listem-altband"><a style="color: white;" href="">#Siyaset</a></li>
		<li class="list-inline-item listem-altband"><a style="color: white;" href="">#Teknoloji</a></li>
		<li class="list-inline-item listem-altband"><a style="color: white;" href="">#Spor</a></li>
</ul>
</header>

<!-- ... end Header-BP -->


<!-- Responsive Header-BP -->

<header class="header header-responsive" id="site-header-responsive">

	<div class="header-content-wrapper">
		<ul class="nav nav-tabs mobile-app-tabs" role="tablist">
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#request" role="tab">
					<div class="control-icon has-items">
						<svg class="olymp-happy-face-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
						<div class="label-avatar bg-blue">6</div>
					</div>
				</a>
			</li>

			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#chat" role="tab">
					<div class="control-icon has-items">
						<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
						<div class="label-avatar bg-purple">2</div>
					</div>
				</a>
			</li>

			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#notification" role="tab">
					<div class="control-icon has-items">
						<svg class="olymp-thunder-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-thunder-icon"></use></svg>
						<div class="label-avatar bg-primary">8</div>
					</div>
				</a>
			</li>

			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#search" role="tab">
					<svg class="olymp-magnifying-glass-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
					<svg class="olymp-close-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
				</a>
			</li>
		</ul>
	</div>

	<!-- Tab panes -->
	<div class="tab-content tab-content-responsive">

		<div class="tab-pane " id="chat" role="tabpanel">

			<div class="mCustomScrollbar" data-mcs-theme="dark">
				<div class="ui-block-title ui-block-title-small">
					<h6 class="title">Chat / Messages</h6>
					<a href="#">Mark all as read</a>
					<a href="#">Settings</a>
				</div>

				<ul class="notification-list chat-message">
					<li class="message-unread">
						<div class="author-thumb">
							<img src="../assets/img/avatar59-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<a href="#" class="h6 notification-friend">Diana Jameson</a>
							<span class="chat-message-item">Hi James! It’s Diana, I just wanted to let you know that we have to reschedule...</span>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 hours ago</time></span>
						</div>
									<span class="notification-icon">
										<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
									</span>
						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
						</div>
					</li>

					<li>
						<div class="author-thumb">
							<img src="../assets/img/avatar60-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<a href="#" class="h6 notification-friend">Jake Parker</a>
							<span class="chat-message-item">Great, I’ll see you tomorrow!.</span>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 hours ago</time></span>
						</div>
									<span class="notification-icon">
										<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
									</span>

						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
						</div>
					</li>
					<li>
						<div class="author-thumb">
							<img src="../assets/img/avatar61-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<a href="#" class="h6 notification-friend">Elaine Dreyfuss</a>
							<span class="chat-message-item">We’ll have to check that at the office and see if the client is on board with...</span>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 9:56pm</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
										</span>
						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
						</div>
					</li>

					<li class="chat-group">
						<div class="author-thumb">
							<img src="../assets/img/avatar11-sm.jpg" alt="author">
							<img src="../assets/img/avatar12-sm.jpg" alt="author">
							<img src="../assets/img/avatar13-sm.jpg" alt="author">
							<img src="../assets/img/avatar10-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<a href="#" class="h6 notification-friend">You, Faye, Ed &amp; Jet +3</a>
							<span class="last-message-author">Ed:</span>
							<span class="chat-message-item">Yeah! Seems fine by me!</span>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">March 16th at 10:23am</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-chat---messages-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
										</span>
						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
						</div>
					</li>
				</ul>

				<a href="#" class="view-all bg-purple">View All Messages</a>
			</div>

		</div>

		<div class="tab-pane " id="notification" role="tabpanel">

			<div class="mCustomScrollbar" data-mcs-theme="dark">
				<div class="ui-block-title ui-block-title-small">
					<h6 class="title">Notifications</h6>
					<a href="#">Mark all as read</a>
					<a href="#">Settings</a>
				</div>

				<ul class="notification-list">
					<li>
						<div class="author-thumb">
							<img src="../assets/img/avatar62-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<div><a href="#" class="h6 notification-friend">Mathilda Brinker</a> commented on your new <a href="#" class="notification-link">profile status</a>.</div>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">4 hours ago</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-comments-post-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
										</span>

						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
							<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
						</div>
					</li>

					<li class="un-read">
						<div class="author-thumb">
							<img src="../assets/img/avatar63-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<div>You and <a href="#" class="h6 notification-friend">Nicholas Grissom</a> just became friends. Write on <a href="#" class="notification-link">his wall</a>.</div>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">9 hours ago</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-happy-face-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
										</span>

						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
							<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
						</div>
					</li>

					<li class="with-comment-photo">
						<div class="author-thumb">
							<img src="../assets/img/avatar64-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<div><a href="#" class="h6 notification-friend">Sarah Hetfield</a> commented on your <a href="#" class="notification-link">photo</a>.</div>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 5:32am</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-comments-post-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
										</span>

						<div class="comment-photo">
							<img src="../assets/img/comment-photo1.jpg" alt="photo">
							<span>“She looks incredible in that outfit! We should see each...”</span>
						</div>

						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
							<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
						</div>
					</li>

					<li>
						<div class="author-thumb">
							<img src="../assets/img/avatar65-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<div><a href="#" class="h6 notification-friend">Green Goo Rock</a> invited you to attend to his event Goo in <a href="#" class="notification-link">Gotham Bar</a>.</div>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">March 5th at 6:43pm</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-happy-face-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
										</span>

						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
							<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
						</div>
					</li>

					<li>
						<div class="author-thumb">
							<img src="../assets/img/avatar66-sm.jpg" alt="author">
						</div>
						<div class="notification-event">
							<div><a href="#" class="h6 notification-friend">James Summers</a> commented on your new <a href="#" class="notification-link">profile status</a>.</div>
							<span class="notification-date"><time class="entry-date updated" datetime="2004-07-24T18:18">March 2nd at 8:29pm</time></span>
						</div>
										<span class="notification-icon">
											<svg class="olymp-heart-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
										</span>

						<div class="more">
							<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
							<svg class="olymp-little-delete"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
						</div>
					</li>
				</ul>

				<a href="#" class="view-all bg-primary">View All Notifications</a>
			</div>

		</div>

		<div class="tab-pane " id="search" role="tabpanel">

				<form class="search-bar w-search notification-list friend-requests">
					<div class="form-group with-button">
						<input style="color: white;" class="form-control js-user-search"  type="text">
					</div>
				</form>


		</div>

	</div>
	<!-- ... end  Tab panes -->
<ul style="height: 35px; background-color: #606480; margin-right: -70px; margin-left: -70px;" class="col-12 list-inline listem-altband-ul">
		<li class="list-inline-item listem-altband">Neler Oluyor ?</li>
		<li class="list-inline-item listem-altband">Bugün</li>
		<li class="list-inline-item listem-altband">Tayfa</li>
		<li class="list-inline-item listem-altband">#Siyaset</li>
		<li class="list-inline-item listem-altband">#Teknoloji</li>
		<li class="list-inline-item listem-altband">#Spor</li>
</ul>
</header>

<div class="header-spacer"></div>


<!--  bekle  -->
</div>
</template>

<script>

import { APIService } from "../APIService";
const apiService = new APIService();
export default {
  name: 'Nav',
   data() {
    	return {
			searchData:'',
			users:[]
		}
	},
	methods:{
		test(){

		},
		search(searchData){
			console.log(this.searchData);
			 let key={
				key: searchData
			 }
			apiService.searchUser(key).then(data => {
				if(data.data==='err'){

				}
				else{
					this.users = data.data;
					this.init(this.users);
				}
					
			});
		},
		init(data){
			
		}
	  },
	 created(){
	  this.init([]);
	  },
	computed: {
		//this.searchData
		
	},
	 watch:{
		 searchData(value){
			 this.search([]);
			 this.search(value);
			 console.log(this.users);
		 }
	 }
}
</script>
