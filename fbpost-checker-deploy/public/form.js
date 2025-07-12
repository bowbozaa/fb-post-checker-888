document.getElementById("postForm").addEventListener("submit", submitForm);

async function submitForm(e) {
  e.preventDefault();

  const postData = {
    employeeName: document.getElementById("employeeName").value,
    employeeId: document.getElementById("employeeId").value,
    teamCode: document.getElementById("teamCode").value,
    position: document.getElementById("position").value,
    keywords: document.getElementById("keywords").value,
    postType: document.getElementById("postType").value,
    userRole: document.getElementById("userRole").value,
    postLink: document.getElementById("postLink").value,
    postText: document.getElementById("postText").value,
    action: "submitPost"
  };

  // แสดงกำลังรอ
  document.getElementById("result").innerText = "⏳ กำลังประมวลผล...";

  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.text();
    document.getElementById("result").innerText = result;
  } catch (err) {
    document.getElementById("result").innerText = "❌ เกิดข้อผิดพลาด: " + err.message;
  }
}
