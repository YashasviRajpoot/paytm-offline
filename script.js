let activeAmount = 150;
let activeTypeName = "Scan & Pay";

function switchSection(sectionId) {
    document.querySelectorAll('.action-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function returnHome() {
    document.querySelectorAll('.action-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('pinModalPopup').classList.remove('active');
    document.getElementById('successModalPopup').classList.remove('active');
    document.getElementById('bankModalPopup').classList.remove('active');
}

function triggerUtilityAction(name) {
    let val = prompt(`Enter amount for ${name}:`, "199");
    if(val) {
        activeAmount = val;
        activeTypeName = name;
        document.getElementById('pinModalPopup').classList.add('active');
    }
}

function startPayment(typeName) {
    activeTypeName = typeName;
    if(typeName === 'Scan & Pay') activeAmount = document.getElementById('scanInputAmt').value;
    if(typeName === 'Mobile Transfer') activeAmount = document.getElementById('mobileInputAmt').value;
    if(typeName === 'Bank Transfer') activeAmount = document.getElementById('bankInputAmt').value;

    document.getElementById('pinModalPopup').classList.add('active');
}

function completeTransaction() {
    document.getElementById('pinModalPopup').classList.remove('active');
    document.getElementById('finalType').innerText = activeTypeName;
    document.getElementById('finalAmt').innerText = activeAmount;

    let balNode = document.getElementById('displayedBalance');
    let currentBal = parseFloat(balNode.innerText.replace(',', ''));
    let updatedBal = currentBal - parseFloat(activeAmount);
    balNode.innerText = updatedBal.toLocaleString('en-IN', {minimumFractionDigits: 2});

    let historyLog = document.getElementById('passbookLogs');
    historyLog.innerHTML = `<p style="padding:6px 0; border-bottom:1px solid #eee;">✅ Paid ₹${activeAmount} for ${activeTypeName} - <b>Success</b></p>` + historyLog.innerHTML;

    document.getElementById('successModalPopup').classList.add('active');
}

function openBankPopup() {
    document.getElementById('bankModalPopup').classList.add('active');
}

function closeBankPopup() {
    document.getElementById('bankModalPopup').classList.remove('active');
}