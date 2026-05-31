# Database Design

## 1. Users Collection

This collection stores all registered users of the VaultPass platform.

| Field                  | Type   | Purpose                                              |
| ---------------------- | ------ | ---------------------------------------------------- |
| fullName               | String | Stores the user's full name                          |
| email                  | String | Unique email used for login and identification       |
| password               | String | Stores the hashed password for security              |
| role                   | String | Determines user permissions (user, moderator, admin) |
| failedLoginAttempts    | Number | Tracks failed login attempts                         |
| failedLoginWindowStart | Date   | Stores the start time of the 10-minute login window  |
| lockUntil              | Date   | Stores account lock expiration time                  |
| createdAt              | Date   | Automatically records account creation time          |
| updatedAt              | Date   | Automatically records last update time               |

### Why this collection exists

The Users collection manages authentication, authorization, account security, and user identity within the system.

---

## 2. Activity Logs Collection

This collection stores security-related activities and audit records.

| Field     | Type   | Purpose                                  |
| --------- | ------ | ---------------------------------------- |
| action    | String | Describes the activity performed         |
| user      | String | Email of the user involved               |
| ipAddress | String | IP address where the activity originated |
| timestamp | Date   | Time the activity occurred               |

### Why this collection exists

The Activity Logs collection provides security monitoring and auditing by recording suspicious activities, failed logins, unauthorized access attempts, account deletions, promotions, and other important system events.

---

## Relationship Between Collections

```txt
User
  |
  |---- performs actions ---->
  |
Activity Log
```

A user can generate multiple activity logs during their use of the system.