import prisma from './src/config/database.js';

const fixAdminRole = async (email) => {
  try {
    // Find the user
    const user = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      }
    });
    
    if (!user) {
      console.log('❌ User not found:', email);
      return;
    }
    
    console.log('📋 Current user details:');
    console.log('   Email:', user.email);
    console.log('   Name:', user.firstName, user.lastName);
    console.log('   Current Role:', user.role);
    console.log('   Active:', user.isActive);
    
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      console.log('✅ User already has admin role!');
      return;
    }
    
    // Update to ADMIN
    const updatedUser = await prisma.users.update({
      where: { email: email.toLowerCase() },
      data: {
        role: 'ADMIN',
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      }
    });
    
    console.log('\n✅ User role updated successfully!');
    console.log('   New Role:', updatedUser.role);
    console.log('\n⚠️  Important: The user needs to log out and log in again for the change to take effect!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
};

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log('Usage: node fix-admin-role.js <email>');
  console.log('Example: node fix-admin-role.js admin@example.com');
  process.exit(1);
}

console.log('🔧 Fixing admin role for:', email);
console.log('');
fixAdminRole(email);
