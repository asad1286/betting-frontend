/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  Table,
  Space,
  message,
  Row,
  Col,
  Statistic,
  List,
  Select,
} from "antd";

const { Title, Paragraph, Text } = Typography;
const { Countdown } = Statistic;
const { Option } = Select;

const ROUND_DURATION_MS = 60 * 1000; // 60 seconds
const BET_CLOSE_BUFFER_MS = 15 * 1000; // Last 15 seconds – betting closes

const BtcGameControlPro = () => {
  const [pastRounds, setPastRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);
  const [previousResult, setPreviousResult] = useState(null);
  const [isBettingOpen, setIsBettingOpen] = useState(false);
  const [bets, setBets] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [adminFinalResult, setAdminFinalResult] = useState(null);
  const [roundCounter, setRoundCounter] = useState(1);
  const [autoRun, setAutoRun] = useState(true);

  // Update betting open state based on remaining time
  useEffect(() => {
    if (!currentRound) return;
    setIsBettingOpen(true);
    const timer = setInterval(() => {
      const now = Date.now();
      const timeLeft = currentRound.endTime - now;

      if (timeLeft <= BET_CLOSE_BUFFER_MS) {
        setIsBettingOpen(false);
      }
      if (timeLeft <= 0) {
        clearInterval(timer);
        showFinalResult();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentRound]);

  // Start a new round automatically
  const startRound = () => {
    if (currentRound) {
      message.error("A round is already active.");
      return;
    }
    const roundId = roundCounter;
    setRoundCounter(roundCounter + 1);
    const now = Date.now();
    const newRound = {
      roundId,
      startTime: now,
      endTime: now + ROUND_DURATION_MS,
      previousResult,
    };
    setCurrentRound(newRound);
    setBets([]);
    setIsBettingOpen(true);
    setSelectedResult(null);
    setAdminFinalResult(null);
    message.success(`Round #${roundId} started!`);
  };

  // When admin clicks "Finalize Round"
  const finalizeRound = () => {
    if (!currentRound) {
      message.error("No active round to finalize.");
      return;
    }
    if (!selectedResult) {
      message.error("Please select a result (UP or DOWN) before finalizing.");
      return;
    }
    setAdminFinalResult(selectedResult);
    message.info(`Admin selected result: ${selectedResult}. It will be published at round end.`);
  };

  // When round time ends, publish the result and start the next round (if autoRun is true)
  const showFinalResult = () => {
    if (!currentRound) return;
    // Auto-finalize if admin hasn't finalized.
    const upTotal = bets.filter((b) => b.type === "UP").reduce((acc, b) => acc + b.amount, 0);
    const downTotal = bets.filter((b) => b.type === "DOWN").reduce((acc, b) => acc + b.amount, 0);
    const autoResult = upTotal > downTotal ? "UP" : "DOWN";
    const finalResult = adminFinalResult || autoResult;

    const finalizedRound = {
      key: currentRound.roundId,
      orderName: `#${currentRound.roundId}`,
      startTime: new Date(currentRound.startTime).toLocaleTimeString(),
      result: finalResult,
      betUpAmount: upTotal,
      betDownAmount: downTotal,
      previousResult: currentRound.previousResult || "N/A",
    };

    setPastRounds((prev) => [...prev, finalizedRound]);
    setPreviousResult(finalResult);
    message.success(`Round #${currentRound.roundId} finalized with result: ${finalResult}`);

    // Clear current round
    setCurrentRound(null);
    setIsBettingOpen(false);
    setBets([]);
    setSelectedResult(null);
    setAdminFinalResult(null);

    // Auto-start next round if autoRun is enabled
    if (autoRun) {
      setTimeout(() => startRound(), 2000); // 2-second delay before next round
    }
  };

  // Simulate placing a bet.
  const placeBet = (type) => {
    if (!isBettingOpen) {
      message.error("Betting is closed for this round!");
      return;
    }
    const betAmount = Math.floor(Math.random() * 100) + 10;
    setBets((prev) => [...prev, { type, amount: betAmount, timestamp: Date.now() }]);
    message.success(`Bet placed for ${type} with ${betAmount} USDT!`);
  };

  // Stop auto-run rounds; if a round is active, finalize it immediately.
  const stopRounds = () => {
    setAutoRun(false);
    if (currentRound) {
      message.info("Stopping rounds. Finalizing current round now...");
      // If admin hasn't selected a result, auto-finalize.
      if (!selectedResult) {
        setSelectedResult(bets.filter(b => b.type === "UP").length >= bets.filter(b => b.type === "DOWN").length ? "UP" : "DOWN");
      }
      finalizeRound();
    } else {
      message.info("Rounds have been stopped.");
    }
  };

  // Count user bets
  const upBetsCount = bets.filter((b) => b.type === "UP").length;
  const downBetsCount = bets.filter((b) => b.type === "DOWN").length;

  const columns = [
    { title: "Order Name", dataIndex: "orderName", key: "orderName" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "Result", dataIndex: "result", key: "result" },
    { title: "UP Bet Amount", dataIndex: "betUpAmount", key: "betUpAmount" },
    { title: "DOWN Bet Amount", dataIndex: "betDownAmount", key: "betDownAmount" },
    { title: "Previous Result", dataIndex: "previousResult", key: "previousResult" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>BTC Game Control (Admin)</Title>

      <Space style={{ marginBottom: 20 }}>
        {autoRun ? (
          <Button type="primary" onClick={stopRounds}>
            Stop Rounds
          </Button>
        ) : (
          <Button type="primary" onClick={() => { setAutoRun(true); startRound(); }}>
            Resume Rounds
          </Button>
        )}
      </Space>

      {/* Automatically start first round if none active and autoRun is true */}
      {autoRun && !currentRound && startRound()}

      {currentRound ? (
        <Card title={`Current Round #${currentRound.roundId}`} style={{ marginBottom: 20 }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>Start Time:</Text> {new Date(currentRound.startTime).toLocaleString()}
              <br />
              <Text strong>Betting Open:</Text> {isBettingOpen ? "Yes" : "No"}
            </Col>
            <Col span={8}>
              <Text strong>Users Bet on UP:</Text> {upBetsCount}
              <br />
              <Text strong>Users Bet on DOWN:</Text> {downBetsCount}
            </Col>
            <Col span={8}>
              <Text strong>Time Left:</Text>
              <br />
              <Countdown value={currentRound.endTime} format="ss" />
            </Col>
          </Row>
          <Space style={{ marginTop: 20 }}>
            <Select
              placeholder="Select Result"
              onChange={(value) => setSelectedResult(value)}
              style={{ width: 120 }}
              value={selectedResult}
            >
              <Option value="UP">UP</Option>
              <Option value="DOWN">DOWN</Option>
            </Select>
            <Button type="primary" onClick={finalizeRound}>
              Finalize Round
            </Button>
          </Space>
          {adminFinalResult && (
            <Card type="inner" style={{ marginTop: 20 }}>
              <Text strong>Admin Finalized Result: </Text> {adminFinalResult}
            </Card>
          )}
        </Card>
      ) : (
        <Card title="No Active Round">
          <Paragraph>No round is currently active.</Paragraph>
        </Card>
      )}

      <Title level={4}>Past Rounds</Title>
      <Table columns={columns} dataSource={pastRounds} pagination={false} />
    </div>
  );
};

export default BtcGameControlPro;
