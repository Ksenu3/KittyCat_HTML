
    const form = document.getElementById('player-form');
    const input = document.getElementById('player-name');
    const status = document.getElementById('status');
    const next = document.getElementById('next');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = input.value.trim();
      if (!name) return;

      const key = 'kitty-cat-save:' + name.toLocaleLowerCase();
      try {
        const saved = localStorage.getItem(key);
        if (!saved) {
          status.textContent = 'Tallennusta ei löytynyt tällä nimellä.';
          status.className = 'message error';
          next.hidden = true;
          return;
        }

        const game = JSON.parse(saved);
        const playerName = game.name || name;
        sessionStorage.setItem('kitty-cat-current-player', playerName);
        status.textContent = 'Tervetuloa takaisin, ' + playerName + '!';
        status.className = 'message success';
        next.href = 'game.html?mode=continue&name=' + encodeURIComponent(playerName);
        next.hidden = false;
      } catch (error) {
        status.textContent = 'Tallennusta ei voitu lukea.';
        status.className = 'message error';
        next.hidden = true;
      }
    });

    input.addEventListener('input', function () {
      next.hidden = true;
      status.textContent = '';
    });