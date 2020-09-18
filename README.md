P7_billois_stephane

Model de base de données MariaDB:

Table "Users":
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| email     | varchar(255) | NO   | UNI | NULL    |                |
| username  | varchar(255) | NO   |     | NULL    |                |
| password  | varchar(255) | NO   |     | NULL    |                |
| url_image | varchar(255) | YES  |     | NULL    |                |
| bio       | varchar(255) | YES  |     | NULL    |                |
| admin     | tinyint(1)   | NO   |     | 0       |                |
| moderator | tinyint(1)   | NO   |     | 0       |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+

Table "Messages":
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| user_id     | int(11)      | NO   | MUL | NULL    |                |
| title       | varchar(255) | YES  |     | NULL    |                |
| content     | text         | NO   |     | NULL    |                |
| attachement | varchar(255) | NO   |     | NULL    |                |
| createdAt   | datetime     | NO   |     | NULL    |                |
| updatedAt   | datetime     | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
