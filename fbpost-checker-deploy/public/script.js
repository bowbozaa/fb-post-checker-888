document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const errorElem = document.getElementById("error");

  try {
    const url = `${GAS_BASE_URL}?action=login&user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}&v=${Date.now()}`; // ป้องกัน cache ด้วย timestamp

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store"  // 💥 บังคับไม่ให้ใช้ cache
    });

    const data = await res.json();
    if (data.result === "success") {
      window.location.href = "form.html";
    } else {
      errorElem.textContent = "❌ รหัสผ่านหรือผู้ใช้ไม่ถูกต้อง";
    }
  } catch (error) {
    errorElem.textContent = "❌ เกิดข้อผิดพลาด: " + error.message;
  }
});
