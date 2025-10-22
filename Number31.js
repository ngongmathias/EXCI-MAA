class User {
  constructor(id, name, email, role = 'user') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }

  async getData(delay = 2000) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {    
        const userData = {
          id: this.id,
          name: this.name,
          email: this.email,
          role: this.role,
          fetchedAt: new Date().toISOString(),
          status: 'active',
          profile: {
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}`,
            joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date().toISOString()
          }
        };
      }, delay);
    });
  }

  
  toString() {
    return `User(id=${this.id}, name=${this.name},email=${this.email}, role=${this.role})`;
  }
}

async function testUserClass() {
  console.log('🚀 Starting User Class Demo...\n');
  const user = new User(1, 'John Doe', 'john@example.com', 'admin');
  console.log('✅ User created:', user.toString());
  
  console.log('\n🎉 Demo complete!');
}

testUserClass().catch(console.error);
