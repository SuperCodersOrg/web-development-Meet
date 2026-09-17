const homesec = document.getElementById("home-section");
const home = document.getElementById("nav-home");
const about = document.getElementById("nav-about");
const courses = document.getElementById("nav-courses");
const students = document.getElementById("nav-students");
const facilities = document.getElementById("nav-facilities");
const placements = document.getElementById("nav-placements");
const contact = document.getElementById("nav-contact");

home.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3300/home")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        homesec.innerHTML = `
          <h1>XYZ College</h1>
          <div class="about-list">
            ${data.map(item => `
              <div class="card">
                <h3>${item.title || item.name || "Notice"}</h3>
                <p>${item.description || item.detail || ""}</p>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        homesec.innerHTML = `
          <h1>XYZ College</h1>
          <div>${data.id || "Home Content Loaded"}</div>
        `;
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      homesec.innerHTML = `<p class="error-msg">Error loading data from server!</p>`;
    });
});

courses.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3300/courses")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {

      homesec.innerHTML = `
        <h1>Courses Offered</h1>
        <div class="course-btn-group">
          <button class="course-btn" onclick="loadCourseDetail('bca')">"BCA"</button>
          <button class="course-btn" onclick="loadCourseDetail('btech')">"BTECH"</button>
          <button class="course-btn" onclick="loadCourseDetail('mca')">"MCA"</button>
        </div>
        <div id="course-detail-container"></div>
      `;
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      homesec.innerHTML = `<p class="error-msg">Error loading data from server!</p>`;
    });
});

window.loadCourseDetail = function (courseName) {
  const container = document.getElementById("course-detail-container");


  fetch(`http://localhost:3300/courses/${courseName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const list = Array.isArray(data) ? data : [data];
      container.innerHTML = list.map(item => `
        <div class="card detail-card">
          <h3>${item.name} (${item.code})</h3>
          <p><strong>Duration:</strong> ${item.duration}</p>
          <p><strong>Eligibility:</strong> ${item.eligibility}</p>
          <p><strong>Highlights:</strong> ${Array.isArray(item.highlights) ? item.highlights.join(", ") : item.highlights}</p>
        </div>
      `).join("");
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      container.innerHTML = `<p class="error-msg">Failed to load ${courseName.toUpperCase()} details.</p>`;
    });
};

about.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3300/about")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        homesec.innerHTML = `
          <h1>About College</h1>
          <div class="about-list">
            ${data.map(item => `
              <div class="card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        homesec.innerHTML = `
          <h1>About College</h1>
          <div>ID: ${data.id || "N/A"}</div>
        `;
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      homesec.innerHTML = `<p class="error-msg">Error loading data from server!</p>`;
    });
});

students.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3300/students")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        homesec.innerHTML = `
          <h1>Student Statistics</h1>
          <div class="about-list">
            ${data.map(item => `
              <div class="card">
                <h3>Total Students: ${item.total}</h3>
                <p>BCA: ${item.inBCA}</p>
                <p>MCA: ${item.inMCA}</p>
                <p>BTECH: ${item.inBTECH}</p>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        homesec.innerHTML = `
          <h1>Student Statistics</h1>
          <div class="card">
            <h3>Total: ${data.total}</h3>
            <p>BCA: ${data.inBCA}</p>
            <p>MCA: ${data.inMCA}</p>
            <p>BTECH: ${data.inBTECH}</p>
          </div>
        `;
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      homesec.innerHTML = `<p class="error-msg">Error loading data from server!</p>`;
    });
});

facilities.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3300/facilities")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        const allThreeFacilities = data.map((item) => `
          <div class="card facility-card">
            <h3>#${item.id} - ${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `).join("");

        homesec.innerHTML = `
          <h2>Campus Facilities (${data.length})</h2>
          <div class="facilities-container">
            ${allThreeFacilities}
          </div>
        `;
      } else {
        homesec.innerHTML = `
          <h1>About College</h1>
          <div>ID: ${data.id || "N/A"}</div>
        `;
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      homesec.innerHTML = `<p class="error-msg">Error loading data from server!</p>`;
    });
});

placements.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3300/placements")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        homesec.innerHTML = `
          <h1>Placement Overview</h1>
          <div class="about-list">
            ${data.map(item => `
              <div class="card">
                <h3>Highest Package: ${item.highestPackage}</h3>
                <p>Average Package: ${item.averagePackage}</p>
                <p>Placement Rate: ${item.placementRate}</p>
                <p>Top Recruiters: ${Array.isArray(item.topRecruiters) ? item.topRecruiters.join(", ") : item.topRecruiters}</p>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        homesec.innerHTML = `
          <h1>Placement Overview</h1>
          <div class="card">
            <h3>Highest Package: ${data.highestPackage}</h3>
            <p>Average Package: ${data.averagePackage}</p>
            <p>Placement Rate: ${data.placementRate}</p>
            <p>Top Recruiters: ${Array.isArray(data.topRecruiters) ? data.topRecruiters.join(", ") : data.topRecruiters}</p>
          </div>
        `;
      }
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      homesec.innerHTML = `<p class="error-msg">Error loading data from server!</p>`;
    });
});

contact.addEventListener("click", (e) => {
  e.preventDefault();

  homesec.innerHTML = `
    <h1>Contact Us</h1>
    <div class="form-container">
      <form id="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
      <div id="contact-response"></div>
    </div>
  `;

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    fetch("http://localhost:3300/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        document.getElementById("contact-response").innerHTML = `
          <p class="success-msg">${result.message}</p>
        `;
        contactForm.reset();
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        document.getElementById("contact-response").innerHTML = `
          <p class="error-msg">Failed to submit form.</p>
        `;
      });
  });
});