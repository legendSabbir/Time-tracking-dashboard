const cards = document.querySelectorAll(".card");
const btns = document.querySelectorAll(".btn");
let active_btn = btns[1];

(async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  const dataMap = new Map(data.map(item => [item.title, item]))
  
  renderData(dataMap)
})();

function renderData (dataMap) {
  btns.forEach(btn => {
    btn.addEventListener("click", function () {
      active_btn.classList.remove("active")
      this.classList.add("active")
      active_btn = this
      cards.forEach(card => {
        const title = card.querySelector("h2").textContent
        const current_time = card.querySelector(".current_time")
        const previous_time = card.querySelector(".previous_time")
        const item = dataMap.get(title)
        const filter = this.dataset.filter;
        current_time.textContent = `${item.timeframes[filter].current}hrs`
        previous_time.textContent = `${filter === "daily" ? "Yesterday" : filter === "weekly" ? "Last Week" : "Last Month"} - ${item.timeframes[filter].previous}hrs`
      })
    })
  })
}