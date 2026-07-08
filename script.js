(function () {
  var stack = document.getElementById('stack');
  var cards = {};
  stack.querySelectorAll('.card').forEach(function (card) {
    cards[card.dataset.card] = card;
  });

  var navButtons = stack.querySelectorAll('.nav button');
  var current = 'front';

  function show(name) {
    if (name === current || !cards[name]) return;

    var front = cards.front;

    if (name === 'front') {
      // Reverse: section slides out right, front slides in from the left.
      cards[current].classList.remove('is-active');
      front.classList.remove('is-left');
      front.classList.add('is-active');
    } else {
      // Forward: front slides out left, section slides in from the right.
      front.classList.remove('is-active');
      front.classList.add('is-left');
      cards[name].classList.add('is-active');
    }

    current = name;

    // Keep hidden cards out of the tab order.
    Object.keys(cards).forEach(function (key) {
      cards[key].toggleAttribute('inert', key !== current);
    });

    // Dot next to the active nav item.
    navButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.target === current);
    });
  }

  stack.addEventListener('click', function (event) {
    var btn = event.target.closest('button[data-target]');
    if (btn) show(btn.dataset.target);
  });

  // Fit the fixed-size card on narrow viewports by scaling the whole card.
  function fit() {
    var scale = Math.min(1, (window.innerWidth - 24) / 600);
    stack.style.transform = scale < 1 ? 'scale(' + scale + ')' : '';
  }
  window.addEventListener('resize', fit);
  fit();
})();
