echo $@

appName= "/dShop"
appComId= "com.dev.dShop"

# projectBase="/DShop"
# cd $projectBase

rm "./icon.png"
rm splash.png
rm "android/app/src/main/res/drawable/splash.png"
# curl $keystore -o "${projectBase}android/app/my-release-key.keystore" && \
echo "BEFORE Spalsh Background::::" && \
convert ./icon1.png -resize 1020x1024 -background white -gravity center -extent 1024x1024 ./icon.png && \
convert ./icon.png -resize 1020x1024 -background white -gravity center -extent 2048x2048 ./splash.png && \
cp "./splash.png" "${projectBase}android/app/src/main/res/drawable/splash.png" && \
echo "AFTER Spalsh Background::::" && \
yarn add -D @bam.tech/react-native-make && \
react-native set-icon --path icon.png --platform android --background white && \
echo "react-native-rename $appName -b $appComId" && \
react-native-rename dShop -b com.dev.dShop &&\
# react-native-rename "$appName" -b $appComId && \
yarn remove @bam.tech/react-native-make  && \


echo "Final Build Started::::"
yarn android

echo "Build succesfull ::::"
