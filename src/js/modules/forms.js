// import checkNumInputs from "./checknumInputs";

import { postData } from "../services/requests";

const closeModal = (item) => {
  item.closest(".popup_calc_end").style.display = "none";
  document.body.style.overflow = "scroll";
};

const clearState = (state) => {
  state = {};
};

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    input = document.querySelectorAll("input"),
    upload = document.querySelectorAll('[name = "upload"]');

  //   checkNumInputs('input[name="user_phone"]');

  const messages = {
    loading: "Загрузка...",
    succes: "Спасибо Мы скоро свяжемся!",
    failure: "Что-то пошло не так!",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };

  const clearInputs = () => {
    input.forEach((item) => {
      item.value = "";
    });

    upload.forEach((item) => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  upload.forEach((item) => {
    item.addEventListener("input", () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split(".");
      arr[0].length > 6 ? (dots = "...") : (dots = ".");
      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);

      let formData = new FormData(item);
      let api;

      item.closest(".popup-design") || item.classList.contains("calc_form")
        ? (api = path.designer)
        : (api = path.question);

      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", messages.ok);
          textMessage.textContent = messages.succes;
        })
        .catch(() => {
          statusImg.setAttribute("src", messages.fail);
          textMessage.textContent = messages.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = "block";
            item.classList.remove("fadeOutUp");
            item.classList.add("fadeInUp");
          }, 5000);
          //   if (item.getAttribute("data-calc") === "end") {
          //     closeModal(item);
          //   }
          clearState(state);
        });
    });
  });
};

export default forms;
