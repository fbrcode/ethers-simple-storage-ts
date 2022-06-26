// JS sync x async (intro)
// async >> Promise (statuses: pending, resolved (fullfiled), rejected)

/*
async function setupMovieNight() {
    await cookPopCorn();
    await pourDrinks();
    startMovie();
}

function cookPopCorn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
*/

async function main() {
  console.log("Hi...");
  let x = 5;
  console.log(x);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
