======================================================================================
Build App With AutoApp Builder

run> sh devAAB.sh
======================================================================================



## To generate the keyStore file
keytool -genkey -noprompt -keystore dShop.keystore -alias alias-XXXXXX -keyalg RSA -storePass XXXXXX  -dname "CN=dShop.online, OU=dShop, O=dShop, L=New Delhi, S=Delhi, C=IN" -validity 36500
==============================================================================================================================================================================================

# To get SHA1 & SHA256>>>

keytool -list -v -keystore Downloads/6435831cd01876000969259c.keystore -alias alias-6435831cd01876000969259c -storepass 6435831cd01876000969259c -keypass android
========================================================================================================================================================================


## To extract kay Hash from keystore

keytool -exportcert -alias androiddebugkey -keystore android/app/debug.keystore | openssl sha1 -binary | openssl base64

========================================================================================================================================================================