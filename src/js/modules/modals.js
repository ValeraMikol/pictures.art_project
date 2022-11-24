const modals = () => {
  let btnPressed;
  const closeModal = (windows, modal) => {
    windows.forEach((item) => {
      item.style.display = "none";
    });
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    //document.body.style.overflow = "";
  };

  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroy = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = "none";
          item.classList.add("animated", "fadeIn");
        });
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        //document.body.style.overflow = "hidden";
      });
    });

    close.addEventListener("click", (item) => {
      closeModal(windows, modal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        //document.body.style.overflow = "";
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;

      document.querySelectorAll("[data-modal]").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }, time);
  }

  function openByScroll(selector) {
    window.addEventListener("scroll", () => {
      if (
        !btnPressed &&
        window.pageYOffset + document.documentElement.clientHeight >=
          document.documentElement.scrollHeight
      ) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
  openByScroll(".fixed-gift");
  // showModalByTime(".popup-consultation", 60000);

  //   showModalByTime(".popup", 60000);
};

export default modals;
