#!/bin/bash
echo "*********************Restarting Tomcat70.******************"

sh /Users/apple/Programs/apache-tomcat-7.0.54/bin/catalina.sh stop
echo "Trying to stop Tomcat."
sh /Users/apple/Programs/apache-tomcat-7.0.54/bin/catalina.sh start
echo "Trying to Start Tomcat"
sleep 2
