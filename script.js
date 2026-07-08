(function () {
  var stack = document.getElementById('stack');
  var flipper = document.getElementById('flipper');
  var frontFace = flipper.querySelector('.face--front');
  var backFace = flipper.querySelector('.face--back');
  var navButtons = flipper.querySelectorAll('.nav button');

  var panels = {};
  backFace.querySelectorAll('.panel').forEach(function (panel) {
    panels[panel.dataset.panel] = panel;
  });

  var current = 'front';

  function show(name) {
    if (name === current) return;

    if (name === 'front') {
      // Flip back over to the front (reverse rotation).
      flipper.classList.remove('flip-back');
      flipper.classList.add('flip-front');
    } else {
      // Put the chosen section on the back side, then flip the card over.
      Object.keys(panels).forEach(function (key) {
        panels[key].hidden = key !== name;
      });
      flipper.classList.remove('flip-front');
      flipper.classList.add('flip-back');
    }

    current = name;

    // Keep the hidden side out of the tab order.
    frontFace.toggleAttribute('inert', current !== 'front');
    backFace.toggleAttribute('inert', current === 'front');

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
