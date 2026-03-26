document.addEventListener('DOMContentLoaded', function () {
  var SUPABASE_URL = 'https://eyshnidksprthamuhmpe.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_fZ-ZCYR6EhCRCSeVMmCdSw_7XnuRToQ';

  // Only run on blog post pages
  var pathParts = window.location.pathname.split('/').filter(Boolean);
  var postsIdx = pathParts.indexOf('posts');
  if (postsIdx === -1 || postsIdx + 1 >= pathParts.length) return;
  var slug = pathParts[postsIdx + 1];

  var liked = localStorage.getItem('liked_' + slug) === 'true';

  // Create like button
  var container = document.createElement('div');
  container.className = 'like-button-container';
  container.innerHTML =
    '<button class="like-btn' + (liked ? ' liked' : '') + '">' +
    '<i class="bi ' + (liked ? 'bi-heart-fill' : 'bi-heart') + '"></i> ' +
    '<span class="like-count">...</span>' +
    '</button>';

  // Insert after title metadata
  var titleMeta = document.querySelector('.quarto-title-meta');
  if (titleMeta) {
    titleMeta.parentNode.insertBefore(container, titleMeta.nextSibling);
  }

  var btn = container.querySelector('.like-btn');
  var countSpan = container.querySelector('.like-count');
  var icon = container.querySelector('.like-btn i');

  // Fetch current count
  fetch(SUPABASE_URL + '/rest/v1/post_likes?slug=eq.' + slug + '&select=likes', {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
    }
  })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      countSpan.textContent = data.length > 0 ? data[0].likes : 0;
    })
    .catch(function () { countSpan.textContent = 0; });

  // Handle click — toggle like/unlike
  btn.addEventListener('click', function () {
    btn.disabled = true;
    var rpcName = liked ? 'decrement_likes' : 'increment_likes';

    fetch(SUPABASE_URL + '/rest/v1/rpc/' + rpcName, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_slug: slug })
    })
      .then(function (r) { return r.json(); })
      .then(function (newCount) {
        liked = !liked;
        countSpan.textContent = newCount;
        icon.className = liked ? 'bi bi-heart-fill' : 'bi bi-heart';
        btn.classList.toggle('liked', liked);
        if (liked) {
          localStorage.setItem('liked_' + slug, 'true');
        } else {
          localStorage.removeItem('liked_' + slug);
        }
        btn.disabled = false;
      })
      .catch(function () { btn.disabled = false; });
  });
});
