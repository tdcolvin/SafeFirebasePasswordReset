# SafeFirebasePasswordReset

Firebase Auth's default password reset app is insecure, as it allows users to enter insecure passwords. This project provides a drop-in replacement.

SafeFirebasePasswordReset ensures that users enter a secure password:

![Demo of SafeFirebasePasswordReset](https://user-images.githubusercontent.com/6803964/229194277-eccade28-9aee-4a94-b6db-84e24a4fc61b.gif)


...Whereas Firebase's default mechanism will accept any 6-character combination:

![Demo of insecure mechanism allowing password 'aaaaaa'](https://user-images.githubusercontent.com/6803964/229190502-10cc58cb-e42a-4d65-b153-b86b473462e2.gif)

Further information on this insecurity is in [this blog](https://medium.com/@tdcolvin/why-firebase-email-password-login-isnt-great-for-security-8835c9adf96e).

## Development prerequisites

* NodeJS >= 16
* Firebase CLI

## Adding into to your Firebase project

1. Find your Firebase project config by going to **Settings** (cog icon) --> **Project settings** in your Firebase console, then click **Add App**. Follow the steps to see a screen like this:  
![Firebase project config](https://user-images.githubusercontent.com/6803964/229196168-258f4108-0a9a-4697-8b9e-4fe9a1f20755.png).  
Your project config is in the red box. Paste this into `src/firebaseConfig.ts` where indicated by comments.

2. Build the project:  
`npm run build`  
The build files will be created in the `build` directory.

3. Upload the `build` directory to any hosting service. If you want to use Firebase Hosting, just run `firebase init`, select Hosting, and answer the questions as follows:  
![Firebase Hosting questions](https://user-images.githubusercontent.com/6803964/229199678-bf04aaab-bdc4-4703-a25b-2a8bc5b95cae.png)


4. In your Firebase console, select **Authentication**, then **Templates** (tab), then press the pencil edit icon, then click **Customise action URL**. Paste in the URL from your hosting service ***plus #***. So if your hosting URL is *https​://my-app.com/resetpassword/*, enter `https://my-app.com/resetpassword/#`. This directs password reset emails to your newly uploaded app.


The app is written using React and can be easily branded or customised.

## Comments, questions, etc

Please open an issue, I will try to respond quickly.

## Contributions

Any and all contributions very welcome but I recommend opening an issue before submitting a pull request.

## License

MIT
