import "regenerator-runtime/runtime";
import axios from "axios";

dragElement(document.getElementById("circle"));

const setDataToDB = async (coords) => {
  return await axios.post(`http://localhost:5000/`, coords).then((response) => {
    return response.data;
  });
};

const getDataToDB = async () => {
  return await axios.get(`http://localhost:5000/`).then((response) => {
    return response.data;
  });
};

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0,
    x = 0,
    y = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  async function elementDrag(e) {
    e = e || window.event;

    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    y = elmnt.offsetTop - pos2;
    x = elmnt.offsetLeft - pos1;

    const coords = { x, y };
    await setDataToDB(coords);
  }

  setInterval(async () => {
    let res = await getDataToDB();

    elmnt.style.top = res.y + "px";
    elmnt.style.left = res.x + "px";

    res.y = y;
    res.x = x;
  }, 5);

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
