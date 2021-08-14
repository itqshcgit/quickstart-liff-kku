//NAT
// Import stylesheets
import "./style.css"

import liff from '@line/liff'

// Body element
const body = document.getElementById('body')

// Button elements
const btnSend = document.getElementById("btnSend")
const btnClose = document.getElementById("btnClose")
const btnShare = document.getElementById("btnShare")
const btnLogIn = document.getElementById("btnLogIn")
const btnLogOut = document.getElementById("btnLogOut")
const btnScanCode = document.getElementById("btnScanCode")
const btnOpenWindow = document.getElementById("btnOpenWindow")

// Profile elements
const email = document.getElementById("email")
const userId = document.getElementById("userId")
const pictureUrl = document.getElementById("pictureUrl")
const displayName = document.getElementById("displayName")
const statusMessage = document.getElementById("statusMessage")

// QR element
const code = document.getElementById("code")
const friendShip = document.getElementById("friendship")

async function main() {
  // 1. Initialize LIFF app)
  await liff.init({ liffId: "1655133639-NwyAvwx6" })
  
  // 2. Try a LIFF function
  switch(liff.getOS()) {
    case "android":
      body.style.backgroundColor = "#d1f5d3"
    break
    case "ios":
      body.style.backgroundColor = "#cccccc"
    break
  }

  // 5. Call getUserProfile()
  // 12. Move getUserProfile() to 2 places
  // getUserProfile()

  // 8. Check where LIFF was opened
  // 8.1 Show login and logout buttons
  // 11. Add condition to show/hide login and logout buttons
  // 16. Show send button only when LIFF was opened in LINE app
  // 20. Show share button where user loggedin
  // 25. Ensure LIFF was opened in LINE app for Android then show QR button
  // 32. Call getFriendship() to 2 places where user is loggedin
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = "none"
      btnLogOut.style.display = "block"
      btnShare.style.display = "block"
      getUserProfile()
      getFriendship()
    } else {
      btnLogIn.style.display = "block"
      btnLogOut.style.display = "none"
    }
  } else {
    getUserProfile()
    btnSend.style.display = "block"
    btnShare.style.display = "block"
    if (liff.getOS() === "android") {
      btnScanCode.style.display = "block"
    }
    getFriendship()
  }

  // 28. Show OpenWindow button
  btnOpenWindow.style.display = "block"
}
main()

// 4. Create getUserProfile()
// 6. Get email *
async function getUserProfile() {
  const profile = await liff.getProfile()
  userId.innerHTML = "<b>userId</b> " + profile.userId
  displayName.innerHTML = "<b>displayName</b> " + profile.displayName
  statusMessage.innerHTML = "<b>statusMessage</b> " + profile.statusMessage
  pictureUrl.src = profile.pictureUrl
  email.innerHTML = "<b>email</b> " + liff.getDecodedIDToken().email
}

// 9. Add event listener to login button
btnLogIn.onclick = () => {
  liff.login()
}

// 10. Add event listener to logout button then reload the page
btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}

// 14. Create sendMsg()
// 14.1 Ensure LIFF was opened from LINE app
// 29. Change alert to close
async function sendMsg() {
  if (liff.getContext().type !== "none" && liff.getContext().type !== "external") {
    await liff.sendMessages([
      {
        type: "text",
        text: "This msg was sent by LIFF"
      }
    ])
    liff.closeWindow()
  }
}

// 15. Add event listener to send button
btnSend.onclick = () => {
  sendMsg()
}

// 18. Create shareMsg()
async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: "image",
      originalContentUrl: "https://linerookie.com/images/ic_liff.png",
      previewImageUrl: "https://linerookie.com/images/ic_liff.png"
    }
  ])
}

// 19. Add event listener to share button
btnShare.onclick = () => {
  shareMsg()
}

// 23. Create scanCode()
async function scanCode() {
  const result = await liff.scanCode()
  code.innerHTML = "<b>QR</b> " + result.value
}

// 24. Add event listener to QR button
btnScanCode.onclick = () => {
  scanCode()
}

// 27. Add event listener to OpenWindow button
btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: "https://line.me",
    external: false
  })
}

// 31. Create getFriendship()
// 31.1 Add condition to check friend status
async function getFriendship() {
 let msg = "Hooray! you and our chatbot are friend"
 const friend = await liff.getFriendship()
 if (!friend.friendFlag) {
   msg = "<a href='https://line.me/R/ti/p/@754tuyrl'>Follow our chatbot here!</a>"
 }
 friendShip.innerHTML = msg
}