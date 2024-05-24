class User {
  constructor(options) {
    const { id, name, profileImg, role, email } = options;
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
    this.profileImg = profileImg;
  }
}

export default User;
