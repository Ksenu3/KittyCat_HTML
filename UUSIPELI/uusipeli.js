
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
        if (localStorage.getItem(key) &&
            !confirm('Tällä nimellä on jo tallennus. Aloitetaanko alusta?')) return;

        localStorage.setItem(key, JSON.stringify({ name: name, level: 1 }));
        sessionStorage.setItem('kitty-cat-current-player', name);
        status.textContent = 'Hei ' + name + '! Uusi peli on luotu!';
        status.className = 'message success';
        next.href = 'game.html?mode=new&name=' + encodeURIComponent(name);
        next.hidden = false;
      } catch (error) {
        status.textContent = 'Tallennus ei onnistunut tässä selaimessa.';
        status.className = 'message error';
      }
    });

    input.addEventListener('input', function () {
      next.hidden = true;
      status.textContent = '';
    });