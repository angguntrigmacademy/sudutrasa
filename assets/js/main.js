/**
* Template Name: Flavora
* Template URL: https://bootstrapmade.com/flavora-bootstrap-restaurant-template/
* Updated: Mar 22 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active') && !navmenu.classList.contains('toggle-dropdown')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", function () {
  /* MESIN POP-UP DINAMIS MENU */
  const dishRows = document.querySelectorAll(".dish-row");
  const modalElement = document.getElementById("menuDetailModal");
  
  if (dishRows.length > 0 && modalElement) {
    const modalInstance = new bootstrap.Modal(modalElement);

    dishRows.forEach((row) => {
      row.setAttribute("title", "Klik untuk melihat detail hidangan");
      row.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").getAttribute("src");
        const title = this.querySelector(".dish-header h4").innerText;
        const price = this.querySelector(".dish-price").innerText;
        const desc = this.querySelector(".dish-info p").innerText;

        document.getElementById("modalDishImg").setAttribute("src", imgSrc);
        document.getElementById("modalDishTitle").innerText = title;
        document.getElementById("modalDishPrice").innerText = price;
        document.getElementById("modalDishDesc").innerText = desc;

        modalInstance.show();
      });
    });
  }
});

/* MESIN DIRECT WHATSAPP RESERVASI */
function kirimKeWhatsApp(event) {
  event.preventDefault(); 

  const form = event.target;
  const nama = form.name.value;
  const email = form.email.value;
  const telp = form.phone.value;
  const tanggal = form.date.value;
  const jam = form.time.value;
  const orang = form.people.value;
  const acara = form.occasion.value || "Makan biasa";
  const catatan = form.message.value || "Tidak ada catatan khusus";

  // GANTI ANGKA DI BAWAH DENGAN NOMOR WHATSAPP RESTORANMU (Awalan 62)
  const noWhatsApp = "6281234567890"; 

  const teksPesan = `Halo Admin *SudutRasa*,\n\nSaya ingin melakukan reservasi meja dengan rincian:\n\n*Nama:* ${nama}\n*No. WhatsApp:* ${telp}\n*Email:* ${email}\n*Tanggal:* ${tanggal} (Pukul ${jam} WIB)\n*Jumlah Tamu:* ${orang} Orang\n*Tipe Acara:* ${acara}\n*Catatan Tambahan:* ${catatan}\n\nMohon konfirmasinya. Terima kasih!`;

  const linkWA = `https://api.whatsapp.com/send?phone=${noWhatsApp}&text=${encodeURIComponent(teksPesan)}`;
  
  window.open(linkWA, "_blank");
}

document.addEventListener('DOMContentLoaded', function () {
  const eventTriggers = document.querySelectorAll('.clickable-event');

  // Seleksi Elemen Di Dalam Pop-up Modal
  const modalImg = document.getElementById('modalEventImg');
  const modalTitle = document.getElementById('modalEventTitle');
  const modalDesc = document.getElementById('modalEventDesc');
  const modalBadge = document.getElementById('modalEventBadge');

  eventTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault(); // Mencegah reload halaman atau lompatan scroll

      // Cari pembungkus data terdekat
      const container = this.closest('.event-data-container');

      // Ekstraksi data dari komponen kartu/seksi
      const title = container.querySelector('.event-title').innerText;
      const desc = container.querySelector('.event-desc').innerText;
      const imgSrc = container.getAttribute('data-img');
      const badgeElement = container.querySelector('.event-tag-label');
      const badgeText = badgeElement ? badgeElement.innerText : 'Eksklusif';

      // Distribusi nilai teks ke dalam modal pop-up
      modalImg.src = imgSrc;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;
      modalBadge.innerText = badgeText;
    });
  });
});

// ... (kode-kode custom.js Anda yang sudah ada di atasnya) ...

function kirimKeWhatsApp(event) {
  event.preventDefault(); 
  event.stopPropagation(); 

  const form = event.target;
  
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const phone = form.querySelector('input[name="phone"]').value;
  const date = form.querySelector('input[name="date"]').value;
  const time = form.querySelector('input[name="time"]').value;
  const people = form.querySelector('select[name="people"]').value;
  const occasion = form.querySelector('select[name="occasion"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  const noWA = "622155558888"; 

  let textWA = `Halo SudutRasa, saya ingin melakukan reservasi meja dengan detail berikut:%0A%0A`;
  textWA += `*Nama:* ${name}%0A`;
  textWA += `*Email:* ${email}%0A`;
  textWA += `*No. Telepon:* ${phone}%0A`;
  textWA += `*Tanggal:* ${date}%0A`;
  textWA += `*Waktu:* ${time}%0A`;
  textWA += `*Jumlah Orang:* ${people}%0A`;
  
  if (occasion) {
    textWA += `*Acara:* ${occasion}%0A`;
  }
  
  if (message) {
    textWA += `*Catatan Khusus:* ${message}%0A`;
  }
  
  textWA += `%0AMohon konfirmasinya. Terima kasih!`;

  const successMsg = form.querySelector('#waSuccessMsg');
  if (successMsg) {
    successMsg.classList.remove('d-none');
    successMsg.classList.add('d-block');
  }

  window.open(`https://wa.me/${noWA}?text=${textWA}`, '_blank');
}

// Script untuk Form Halaman Kontak
function kirimPesanWA(event) {
  event.preventDefault(); 
  event.stopPropagation();

  const form = event.target;
  
  // Ambil nilai dari input kontak
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const subject = form.querySelector('input[name="subject"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // Ganti dengan nomor WhatsApp Anda (Format: 62...)
  const noWA = "6281234567890"; 

  // Susun pesan
  let rawText = `Halo SudutRasa, ada pesan masuk dari form kontak:\n\n`;
  rawText += `*Nama:* ${name}\n`;
  rawText += `*Email:* ${email}\n`;
  rawText += `*Subjek:* ${subject}\n\n`;
  rawText += `*Pesan:*\n${message}`;

  // Mengubah spasi dan karakter menjadi format URL yang aman
  const safeTextWA = encodeURIComponent(rawText);

  // Munculkan teks info
  const successMsg = form.querySelector('#waContactSuccess');
  if (successMsg) {
    successMsg.classList.remove('d-none');
    successMsg.style.display = 'block';
  }

  // Buka WhatsApp
  window.open(`https://wa.me/${noWA}?text=${safeTextWA}`, '_blank');
}

// Script untuk Fitur Bagikan di Halaman Detail Acara

function shareEvent(platform) {
  // Mengambil URL halaman saat ini
  const currentUrl = encodeURIComponent(window.location.href);
  const eventTitle = encodeURIComponent(document.querySelector('.event-title-main').innerText);
  
  let shareUrl = "";

  if (platform === 'whatsapp') {
    shareUrl = `https://api.whatsapp.com/send?text=Kunjungi acara seru ini: ${eventTitle} - ${currentUrl}`;
  } else if (platform === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  }

  // Buka tab baru untuk membagikan
  if (shareUrl !== "") {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

function copyEventLink() {
  const dummy = document.createElement('input'),
        text = window.location.href;

  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  alert("Tautan acara berhasil disalin ke clipboard!");
}

document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('.clickable-menu');

  // Seleksi Elemen Modal
  const modalImg = document.getElementById('modalDishImg');
  const modalTitle = document.getElementById('modalDishTitle');
  const modalPrice = document.getElementById('modalDishPrice');
  const modalDesc = document.getElementById('modalDishDesc');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      
      // Ambil teks & URL gambar secara dinamis (berlaku untuk menu biasa & sorotan)
      const title = this.querySelector('h4').innerText;
      const desc = this.querySelector('p').innerText;
      const imgSrc = this.querySelector('img').src;
      
      // Ambil harga (bisa dari class .dish-price atau .spotlight-price)
      const priceElement = this.querySelector('.dish-price') || this.querySelector('.spotlight-price');
      const price = priceElement ? priceElement.innerText : '';

      // Tampilkan data ke dalam Modal Pop-up
      modalImg.src = imgSrc;
      modalTitle.innerText = title;
      modalPrice.innerText = price;
      modalDesc.innerText = desc;
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Cari semua kartu menu yang bisa diklik
    const menuCards = document.querySelectorAll('.clickable-menu');

    // 2. Tambahkan aksi ketika kartu diklik
    menuCards.forEach(function(card) {
        card.addEventListener('click', function() {
            
            // Ambil data dari kartu yang baru saja diklik
            const imgSrc = this.querySelector('img').getAttribute('src');
            const title = this.querySelector('h4').innerText;
            const desc = this.querySelector('p').innerText;
            
            // Cari harga (cek apakah dari menu biasa atau menu sorotan)
            let price = '';
            if (this.querySelector('.dish-price')) {
                price = this.querySelector('.dish-price').innerText;
            } else if (this.querySelector('.spotlight-price')) {
                price = this.querySelector('.spotlight-price').innerText;
            }

            // Tembakkan data tersebut ke dalam Pop-up Modal
            document.getElementById('modalDishImg').setAttribute('src', imgSrc);
            document.getElementById('modalDishTitle').innerText = title;
            document.getElementById('modalDishPrice').innerText = price;
            document.getElementById('modalDishDesc').innerText = desc;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // Pastikan elemen container Isotope ada di halaman
  let isotopeContainer = document.querySelector('.isotope-container');
  
  if (isotopeContainer) {
    // Inisialisasi Isotope
    let initIsotope = new Isotope(isotopeContainer, {
      itemSelector: '.isotope-item',
      layoutMode: 'masonry'
    });

    // Menangani event klik pada tab filter
    let filterTabs = document.querySelectorAll('.isotope-filters li');
    
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Hapus class 'filter-active' dari semua tab
        filterTabs.forEach(function (t) {
          t.classList.remove('filter-active');
        });
        
        // Tambahkan class 'filter-active' pada tab yang baru saja diklik
        this.classList.add('filter-active');

        // Ambil nilai data-filter (contoh: '.filter-starters')
        let filterValue = this.getAttribute('data-filter');
        
        // Terapkan filter pada layout Isotope
        initIsotope.arrange({
          filter: filterValue
        });
        
        // Memperbarui AOS (animasi scroll) setelah elemen diatur ulang posisinya
        if (typeof AOS !== 'undefined') {
          setTimeout(function() { AOS.refresh(); }, 300);
        }
      });
    });
  }
});