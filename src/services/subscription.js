async function createSubscription() {
    const accessToken = await getAccessToken();

    const response = await axios.post(
        "https://graph.microsoft.com/v1.0/subscriptions",
        {
            changeType: "created",
            notificationUrl: "https://your-public-url.com/webhook",
            resource: "/me/mailfolders('inbox')/messages",
            expirationDateTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour expiry
            clientState: "random-string"
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    console.log("Subscription created:", response.data);
}

createSubscription();
