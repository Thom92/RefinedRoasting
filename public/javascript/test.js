const user = await User.query();

console.log(user[0] instanceof User); // --> true
console.log('there are', user.length, 'People in total');