const modals = () => {
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
    closeClickOverlay = true
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

        windows.forEach((item) => {
          item.style.display = "none";
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
      if (e.target === modal && closeClickOverlay) {
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

  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  showModalByTime(".popup-consultation", 60000);

  //   showModalByTime(".popup", 60000);
};

export default modals;