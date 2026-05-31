# Extra Challenge Questions

## Question 1
### Why is storing plain passwords dangerous even in small applications?

**Answer:**

Storing plain passwords is dangerous because it enables hackers to easily gain access to users' accounts if the database is compromised. Since the passwords are not protected, attackers can immediately see and use them.

---

## Question 2
### What is the difference between authentication and authorization? Give real-world examples.

**Answer:**

Authentication has to do with proving who a user is, while authorization has to do with what certain users can access.

For example, when a user logs into an account on a platform, authentication checks who the person is and whether the person is among its users.

After confirming who the person is, authorization then comes in. For example, in a business, a secretary may have permission to delete records while a regular employee does not. Another example is a teacher having access to edit students' scores, while students can only view their own scores.

---

## Question 3
### Why is JWT expiration important? What could happen if tokens never expire?

**Answer:**

JWT expiration is important because it makes applications more secure and helps protect user accounts from unauthorized access.

If tokens never expire and a token is stolen by a hacker, the hacker could continue accessing the user's account indefinitely.

---

## Question 4
### A hacker gets access to a valid JWT token. What are 3 things you can implement to reduce damage?

**Answer:**

1. Force the user to log out and invalidate the token.
2. Block any form of authorization until the token expires.
3. Monitor the account for suspicious activity and unusual login behavior.

---

## Question 5
### Why should logging systems be treated as sensitive infrastructure?

**Answer:**

Logging systems should be treated as sensitive infrastructure because they contain important user and system information. If they are not properly protected, attackers may use the information stored in logs to carry out further attacks or gain unauthorized access to systems.