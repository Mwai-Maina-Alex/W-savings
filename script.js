// ====== SIGNUP ======
function signup(event) {
    event.preventDefault();
  
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
  
    if (username === "" || password === "") {
      alert("Please fill all fields!");
      return;
    }
  
    // Save user in localStorage
    localStorage.setItem("user_" + username, password);
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  }
  
  // ====== LOGIN ======
  function login(event) {
    event.preventDefault();
  
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
  
    let storedPassword = localStorage.getItem("user_" + username);
  
    if (storedPassword && storedPassword === password) {
      localStorage.setItem("loggedInUser", username); // Save current user
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password!");
    }
  }
  
  // ====== LOGOUT ======
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }
  
  // ====== DASHBOARD ======
  let balance = 0;
  let categories = {
    bills: 0,
    ziidi: 0,
    emergency: 0,
    income: 0
  };
  
  let historyList = [];
  
  window.onload = function () {
    let user = localStorage.getItem("loggedInUser");
    if (user && document.getElementById("welcome-message")) {
      document.getElementById("welcome-message").innerText = "Welcome, " + user + "!";
      updateBalance();
      renderChart();
    }
  };
  
  // ====== ADD MONEY IN ======
  function addMoney() {
    let amount = parseFloat(document.getElementById("money-in").value);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount!");
      return;
    }
  
    balance += amount;
    categories.income += amount;
    historyList.push("Added Income: $" + amount);
    updateBalance();
    renderHistory();
    renderChart();
    document.getElementById("money-in").value = "";
  }
  
  // ====== SPEND ON BILLS ======
  function spendBills() {
    let amount = parseFloat(document.getElementById("bills").value);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      alert("Enter a valid amount (not more than balance)!");
      return;
    }
  
    balance -= amount;
    categories.bills += amount;
    historyList.push("Spent on Bills: $" + amount);
    updateBalance();
    renderHistory();
    renderChart();
    document.getElementById("bills").value = "";
  }
  
  // ====== SAVE ON ZIIDI ======
  function saveZiidi() {
    let amount = parseFloat(document.getElementById("ziidi").value);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      alert("Enter a valid amount (not more than balance)!");
      return;
    }
  
    balance -= amount;
    categories.ziidi += amount;
    historyList.push("Saved on Ziidi: $" + amount);
    updateBalance();
    renderHistory();
    renderChart();
    document.getElementById("ziidi").value = "";
  }
  
  // ====== SAVE FOR EMERGENCY ======
  function saveEmergency() {
    let amount = parseFloat(document.getElementById("emergency").value);
    if (isNaN(amount) || amount <= 0 || amount > balance) {
      alert("Enter a valid amount (not more than balance)!");
      return;
    }
  
    balance -= amount;
    categories.emergency += amount;
    historyList.push("Saved for Emergency: $" + amount);
    updateBalance();
    renderHistory();
    renderChart();
    document.getElementById("emergency").value = "";
  }
  
  // ====== UPDATE BALANCE ======
  function updateBalance() {
    if (document.getElementById("balance")) {
      document.getElementById("balance").innerText = balance;
    }
  }
  
  // ====== RENDER HISTORY ======
  function renderHistory() {
    let list = document.getElementById("history-list");
    if (!list) return;
    list.innerHTML = "";
    historyList.forEach(item => {
      let li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }
  
  // ====== PIE CHART ======
  let chart;
  
  function renderChart() {
    let ctx = document.getElementById("savingsChart");
    if (!ctx) return;
  
    if (chart) {
      chart.destroy();
    }
  
    chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Bills", "Ziidi", "Emergency", "Remaining Balance"],
        datasets: [{
          data: [
            categories.bills,
            categories.ziidi,
            categories.emergency,
            balance
          ],
          backgroundColor: ["#e53e3e", "#38a169", "#dd6b20", "#2b6cb0"]
        }]
      }
    });
  }
  