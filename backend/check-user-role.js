import prisma from './src/config/database.js';

const checkUserRole = async (email) => {
  try {
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
    
    console.log('✅ User found:');
    console.log('   Email:', user.email);
    console.log('   Name:', user.firstName, user.lastName);
    console.log('   Role:', user.role);
    console.log('   Active:', user.isActive);
    console.log('   ID:', user.id);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
};

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.log('Usage: node check-user-role.js <email>');
  process.exit(1);
}

checkUserRole(email);
