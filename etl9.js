// ETL9 topic data
const etl9Data = {
        title: "ETL 9: API Automation",
        lessons: [
    {
        "title": "REST APIs for ETL",
        "content": "Modern ETL often pulls data from APIs rather than CSVs.\n**The Python Request Cycle:**\n1. **Request**: `requests.get(url, headers, params)`.\n2. **Handle Status**: `response.raise_for_status()` (Check for 200, 404, 500 errors).\n3. **Parse**: `data = response.json()`.\n\n**Pro Tip**: Always include a `timeout` in your requests to prevent your pipeline from hanging forever."
    },
    {
        "title": "Authentication & Headers",
        "content": "Enterprise APIs require security.\n- **API Keys**: Passed in the URL or header.\n- **Bearer Tokens (JWT)**: Passed in the header: `{\"Authorization\": \"Bearer XYZ\"}`.\n- **Custom Headers**: Used for tracking (`X-Request-ID`) or content-type."
    },
    {
        "title": "Pagination (The Infinite Loop Risk)",
        "content": "If an API has 50,000 records, it won't return them all at once. It returns a \"Page\".\n**Patterns:**\n- **Page-based**: `?page=1`, `?page=2`... Stop when the result list is empty.\n- **Next-Link**: The response contains a URL for the next page.\n- **Offset/Limit**: `?offset=100&limit=100`."
    },
    {
        "title": "JSON Validation with Python",
        "content": "Don't just assume the JSON is correct. \n**Validation Pattern:**\n```python\nrequired = [\"id\", \"status\"]\nfor key in required:\n    if key not in response_data:\n        log_failure(f\"API Schema Break: {key} missing\")\n```\nCheck types using `isinstance(val, int)` for sensitive fields like 'amount'."
    },
    {
        "title": "Mocking APIs for Testing",
        "content": "What if the API is down but you need to test your ETL logic?\nUse the `unittest.mock` or `responses` library to \"simulate\" the API.\nThis allows you to test how your script handles different status codes (500, 403) without actually calling the remote server."
    },
    {
        "title": "Mastery: Rate Limiting & 429 Errors",
        "content": "Enterprises often limit how many times you can call an API per minute.\n**HTTP 429: Too Many Requests.**\n\n**The Handling Strategy:**\n- **Inspect Response Headers**: Many APIs return `Retry-After: 60` (seconds).\n- **Sleep & Retry**: Use your retry logic to wait the duration specified by the server.\n- **Throttling**: Intentionally slow down your script using `time.sleep(0.5)` between calls to stay under the limit."
    }
],
        questions: [
    {
        "number": 1,
        "difficulty": "intermediate/advanced",
        "question": "Which HTTP status code indicates 'Unauthorized'?\\n\\n**Options:**\\n1. 200\\n2. 401\\n3. 404\\n4. 500",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - 401"
    },
    {
        "number": 2,
        "difficulty": "intermediate/advanced",
        "question": "What is an 'Endless Loop' risk in API scripting?\\n\\n**Options:**\\n1. Wrong URL\\n2. Incorrect Pagination logic that never finds an 'end' signal\\n3. High CPU\\n4. Slow network",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - Incorrect Pagination logic that never finds an 'end' signal"
    },
    {
        "number": 3,
        "difficulty": "intermediate/advanced",
        "question": "Why use 'timeout' in requests.get()?\\n\\n**Options:**\\n1. To make it faster\\n2. To prevent the script from waiting forever if the server is unresponsive\\n3. To save battery\\n4. To encrypt the connection",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - To prevent the script from waiting forever if the server is unresponsive"
    },
    {
        "number": 4,
        "difficulty": "intermediate/advanced",
        "question": "How do you access a nested JSON value like 'user' -> 'email'?\\n\\n**Options:**\\n1. data['user_email']\\n2. data['user']['email']\\n3. data.email\\n4. data(user, email)",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 2** - data['user']['email']"
    },
    {
        "number": 5,
        "difficulty": "intermediate/advanced",
        "question": "What does raise_for_status() do?\\n\\n**Options:**\\n1. Deletes the response\\n2. Prints the data\\n3. Raises an exception if the status code indicates an error (e.g. 4xx/5xx)\\n4. Increases the server speed",
        "context": "Select the correct option:",
        "answer": "**Correct Option: 3** - Raises an exception if the status code indicates an error (e.g. 4xx/5xx)"
    }
]
    };

if (typeof window !== 'undefined') {
    window.etl9Data = etl9Data;
}
