class UserInfo {
    constructor({ name, about, avatar }) {
      this._name = name;
      this._about = about;
      this._avatar = avatar;
    }
  
    getUserInfo() {
      const data = {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.src,
      };
      return data;
    }
  
    setUserInfo({ name, about, avatar }) {
      this._name.textContent = name;
      this._about.textContent = about;
      this._avatar.src = avatar;
    }
  }
  
  export default UserInfo;