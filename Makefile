setup:
	yarn
	gem install cocoapods
	cd ios && pod install && cd ..

run-app-ios:
	yarn ios
	npm start
