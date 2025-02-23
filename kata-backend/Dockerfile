FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copier les fichiers Maven
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Rendre le script mvnw exécutable
RUN chmod +x ./mvnw

# Télécharger les dépendances
RUN ./mvnw dependency:go-offline -B

# Copier le code source
COPY src src

# Construire l'application
RUN ./mvnw package -DskipTests

# Étape de production
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copier le JAR de l'étape de construction
COPY --from=build /app/target/*.jar app.jar

# Exposer le port utilisé par l'application
EXPOSE 8080

# Commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]