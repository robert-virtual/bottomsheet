import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.95;
export function ButtomSheet({
  children,
  draggable = false,
  height = SCREEN_HEIGHT / 3,
  visible = false,
}) {
  const context = useSharedValue({ y: 0 });

  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -height) {
        translateY.value = withTiming(SCREEN_HEIGHT);
      }
    });

  useEffect(() => {
    if (!visible && translateY.value != SCREEN_HEIGHT) {
      translateY.value = withTiming(SCREEN_HEIGHT);

      return;
    }
    translateY.value = withTiming(-height);
  }, [visible]);

  const rSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureHandlerRootView
      onTouchEnd={() => {
        translateY.value = withTiming(SCREEN_HEIGHT);
      }}
      style={{
        width: "100%",
        position: "absolute",
      }}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.sheet, rSheetStyle]}>
          <View style={styles.line} />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sheet: {
    zIndex: 999,
    height: SCREEN_HEIGHT,
    width: "100%",
    top: SCREEN_HEIGHT,
  },
  content: {
    zIndex: 998,
    borderRadius: 25,
    padding: 15,
    backgroundColor: "#f3f3f3",
    height: "100%",
  },
  line: {
    alignSelf: "center",
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "gray",
    height: 5,
    width: 40,
  },
});
