# Digital Cookbook

Project for fun to keep track of my recipes and select one fast using suggestions and search functionality on tags and ingredients.

## Notes

Google API has issues with React because it uses file system. The workaround is:

1. Go to `web-application/node_modules/googleapis-common/build/src/discovery.js`
2. Change `const readFile = util.promisify(fs.readFile)` to `const readFile = fs.readFile ? util.promisify(fs.readFile) : async () => {}`

## Mobile deployment

* https://ionicframework.com/docs/react/your-first-app/6-deploying-mobile
* Add this to gradle.properties file:
```
android.enableJetifier=true
android.useAndroidX=true
```
* Change this in AndroidManifest.xml:
```
<provider
		android:name="androidx.core.content.FileProvider"   <--------
		android:authorities="${applicationId}.fileprovider"
		android:exported="false"
		android:grantUriPermissions="true">
		<meta-data
				android:name="android.support.FILE_PROVIDER_PATHS"
				android:resource="@xml/file_paths"></meta-data>
</provider>
```
