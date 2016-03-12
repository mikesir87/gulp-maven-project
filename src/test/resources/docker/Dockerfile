FROM jboss/wildfly:8.2.1.Final

# Installs the ss command, which is used to help Arquillian know the container is ready
USER root
RUN yum install iproute -y
USER jboss

RUN /opt/jboss/wildfly/bin/add-user.sh admin admin --silent
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]