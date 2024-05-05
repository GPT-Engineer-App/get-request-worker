import React, { useState, useEffect } from "react";
import { Container, Text, VStack, Button } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Data Fetching Service</Text>
        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error}</Text>}
        {data && <Text>{JSON.stringify(data)}</Text>}
        <Button onClick={fetchData} colorScheme="blue">
          Refresh Data
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
