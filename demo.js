export default function foo() {
  console.log(1);
}

export const a = 1;

window.clientId =
  "262826757795-hr981pebp6fmundqj2e3b77vaeggh0g9.apps.googleusercontent.com"; //  Google OAuth 客户端 ID
window.redirectUri = "http://localhost:3200"; // 重定向 URI
window.scope = "email profile"; // 请求的权限范围，可以根据需求修改
window.state = "YOUR RTT_STATE"; // 用于防止跨站请求伪造（CSRF）攻击，可以不设置，可以随心设置
window.responseType = "code"; // 授权响应类型，表示要求返回授权码
window.clientSecret = "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"; //Google OAuth 客户端密钥（不是api密钥）
window.grantType = "authorization_code";
window.authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${window.clientId}&redirect_uri=${window.redirectUri}&scope=${window.scope}&state=${window.state}&response_type=${window.responseType}`;
//点击Google登录  执行这个方法进行跳转
window.location.href = window.authUrl;

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const tokenEndpoint = "https://oauth2.googleapis.com/token";
const requestBody = new URLSearchParams();
requestBody.append("code", code);
requestBody.append("client_id", window.clientId);
requestBody.append("client_secret", window.clientSecret);
requestBody.append("redirect_uri", window.redirectUri);
requestBody.append("grant_type", window.grantType);

fetch(tokenEndpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: requestBody,
})
  .then((response) => response.json())
  .then((data) => {
    const accessToken = data.access_token; //打印data可以获得token令牌的信息
    console.log(data);
  })
  .then(() => {
    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log(userInfo);
      });
  });

const config = {
  web: {
    client_id:
      "262826757795-hr981pebp6fmundqj2e3b77vaeggh0g9.apps.googleusercontent.com",
    project_id: "superb-leaf-424101-e6",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "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",
    redirect_uris: ["http://localhost:3200"],
    javascript_origins: ["http://localhost:3200"],
  },
};
