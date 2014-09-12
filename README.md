kaushal
=======

kaushal
Phone Gap installation steps

http://iphonedevlog.wordpress.com/2012/11/20/building-a-phonegap-android-app-on-windows-cordova-2-2-0-with-eclipse/

http://nodejs.org/download/

http://www.gajotres.net/building-a-native-mobile-app-with-phonegap-and-jquery-mobile-1-4/


paths to set for cordova/phonegapo CLI installations
 
export MAVEN_HOME="/opt/apache-maven-3.0.5"
export PATH="$PATH:$MAVEN_HOME/bin"


export ANT_HOME="/opt/apache-ant-1.9.4" 
export PATH="$PATH:$ANT_HOME/bin"
export JAVA_HOME="/opt/jdk1.6.0_23" 
export PATH="$PATH:$JAVA_HOME/bin"
export ANDROID_HOME="/root/software/adt-bundle-linux-x86-20140702"
export ANDROID_TOOLS="/root/software/adt-bundle-linux-x86-20140702/sdk/tools"
export ANDROID_PLATFORM_TOOLS="/root/software/adt-bundle-linux-x86-20140702/sdk/platform-tools"

PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS:.
