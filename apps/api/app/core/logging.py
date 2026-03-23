import logging


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format='{"level":"%(levelname)s","name":"%(name)s","message":"%(message)s"}',
    )
