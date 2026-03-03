# -*- coding: utf-8 -*-
import json


def generate_power_control_config(settings):
    """生成功率控制配置 JSON。

    Args:
        settings: 功率控制设置列表，每项包含:
            - time_period: 时间段，包含 start 和 end
            - power_value: 功率值 (kW)
            - charge_discharge_status: 充放电状态 ("charging" 或 "discharging")

    Returns:
        JSON 字符串
    """
    config = {"power_control_settings": settings}
    return json.dumps(config, ensure_ascii=False, indent=2)


def load_power_control_config(filepath):
    """从 JSON 文件加载功率控制配置。

    Args:
        filepath: JSON 文件路径

    Returns:
        配置字典
    """
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError("无法加载配置文件: {} 不存在".format(filepath))
    except json.JSONDecodeError as e:
        raise ValueError("配置文件 {} 解析失败: {}".format(filepath, e))


def save_power_control_config(config, filepath):
    """将功率控制配置保存到 JSON 文件。

    Args:
        config: 配置字典
        filepath: 保存路径
    """
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(config, f, ensure_ascii=False, indent=2)
    except OSError as e:
        raise OSError("无法保存配置文件到 {}: {}".format(filepath, e))


if __name__ == "__main__":
    # 示例配置：功率值、时间段、充放电状态
    example_settings = [
        {
            "time_period": {"start": "00:00", "end": "08:00"},
            "power_value": 100,
            "charge_discharge_status": "charging",
        },
        {
            "time_period": {"start": "08:00", "end": "18:00"},
            "power_value": 200,
            "charge_discharge_status": "discharging",
        },
        {
            "time_period": {"start": "18:00", "end": "23:59"},
            "power_value": 150,
            "charge_discharge_status": "charging",
        },
    ]

    config_json = generate_power_control_config(example_settings)
    print(config_json)

    # 保存到文件
    save_power_control_config(
        {"power_control_settings": example_settings}, "power_control.json"
    )
    print("\n配置已保存到 power_control.json")
