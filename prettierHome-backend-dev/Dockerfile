FROM maven:3.8.1-openjdk-17 AS build
RUN mkdir -p workspace
WORKDIR /workspace
COPY pom.xml /workspace/
COPY src /workspace/src
RUN mvn clean package -DskipTests

FROM amazoncorretto:17.0.7-alpine
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]






# FROM maven:3.8.1-openjdk-11-slim AS build
# RUN mkdir -p workspace
# WORKDIR /workspace
# COPY pom.xml /workspace/
# COPY src /workspace/src
# RUN mvn clean package -DskipTests

# FROM adoptopenjdk:11-jre-hotspot
# COPY --from=build /workspace/target/*.jar app.jar
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","app.jar"]