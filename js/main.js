const milestonesData = JSON.parse(data).data;
let milestoneImage = document.querySelector(".milestone-image");

// load course milestones data
function loadMilestonesData() {
  const milestones = document.querySelector(".milestones");
  milestones.innerHTML = `${milestonesData
    .map((milestone) => {
      return `<div id="${
        milestone._id
      }" class="milestone border-b border-gray-700 py-1.5 mb-1.5 last:mb-0 last:border-transparent">
        <div class="flex gap-2">
            <div class="checkbox">
                <input type="checkbox" onclick="markMilestone(this, ${
                  milestone._id
                })"/>
            </div>
            <div class="cursor-pointer" onclick="openMilestone(this, ${
              milestone._id
            })">
                <p class="inline-flex items-center gap-2 text-white hover:text-green-300">${
                  milestone.name
                }
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.93934 0.939453L4.99997 4.87883L1.06056 0.939453L0 2.00011L4.99997 7.00011L10 2.00011L8.93934 0.939453Z" fill="#fff" />
                    </svg>                
                </p>
            </div>
        </div>
        <div class="hidden_panel ps-6">
            ${milestone.modules
              .map((module) => {
                return `<div class="module py-2 last:pb-1 border-b border-gray-700 last:border-transparent">
                    <p>${module.name}</p>
                </div>`;
              })
              .join("")}
        </div>
    </div>`;
    })
    .join("")}`;
}

function openMilestone(element, id) {
  const currentPanel = element.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");

  // first remove previous active class if any (other than the clicked one)
  if (active && !element.classList.contains("active")) {
    active.classList.remove("active");
  }

  // toggle current clicked one
  element.classList.toggle("active");

  // first hide previouse panel if open (other than the clicked element)
  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show");
  }

  // toggle current element
  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");
  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

// listen for here image load
milestoneImage.onload = function () {
  this.style.opacity = "1";
};

function markMilestone(checkbox, id) {
  const donelist = document.querySelector(".donelist");
  const milestoneList = document.querySelector(".milestones");
  const markItem = document.getElementById(id);

  if (checkbox.checked) {
    // Mark as done
    milestoneList.removeChild(markItem);
    donelist.appendChild(markItem);
  } else {
    // back to main list
    donelist.removeChild(markItem);
    milestoneList.appendChild(markItem);

    // task - do the ordering / sorting
    const childList = Array.from(milestoneList.childNodes);
    childList
      .toSorted((a, b) => parseInt(a.id) - parseInt(b.id))
      .forEach((element) => milestoneList.appendChild(element));
  }
}

loadMilestonesData();
